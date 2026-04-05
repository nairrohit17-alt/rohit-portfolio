import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const inquiriesPath = path.join(process.cwd(), "content", "inquiries.json");

async function appendInquiry(payload: Required<InquiryPayload>) {
  const nextEntry = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...payload
  };

  let existing: unknown[] = [];

  try {
    const raw = await fs.readFile(inquiriesPath, "utf8");
    existing = JSON.parse(raw) as unknown[];
  } catch (error) {
    if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.writeFile(inquiriesPath, JSON.stringify([nextEntry, ...existing], null, 2), "utf8");
}

async function appendInquirySafely(payload: Required<InquiryPayload>) {
  try {
    await appendInquiry(payload);
  } catch (error) {
    console.error("Failed to append inquiry locally.", error);
  }
}

function getGoogleFormConfig() {
  const actionUrl = process.env.INQUIRY_GOOGLE_FORM_ACTION_URL;
  const nameField = process.env.INQUIRY_GOOGLE_FORM_NAME_FIELD;
  const emailField = process.env.INQUIRY_GOOGLE_FORM_EMAIL_FIELD;
  const phoneField = process.env.INQUIRY_GOOGLE_FORM_PHONE_FIELD;
  const messageField = process.env.INQUIRY_GOOGLE_FORM_MESSAGE_FIELD;

  if (!actionUrl || !nameField || !emailField || !phoneField || !messageField) {
    return null;
  }

  return {
    actionUrl,
    nameField,
    emailField,
    phoneField,
    messageField
  };
}

async function forwardToGoogleForm(payload: Required<InquiryPayload>) {
  const config = getGoogleFormConfig();

  if (!config) {
    return {
      deliveredToGoogleForm: false,
      message: "Thanks for submitting your inquiry."
    };
  }

  const formBody = new URLSearchParams();
  formBody.set(config.nameField, payload.name);
  formBody.set(config.emailField, payload.email);
  formBody.set(config.phoneField, payload.phone);
  formBody.set(config.messageField, payload.message);

  const response = await fetch(config.actionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody.toString(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Google Form submission failed.");
  }

  const body = await response.text();

  if (!body.includes("Your response has been recorded")) {
    throw new Error("Google Form submission could not be confirmed.");
  }

  return {
    deliveredToGoogleForm: true,
    message: "Thanks for submitting your inquiry."
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryPayload;

  const payload = {
    name: body.name?.trim() ?? "",
    email: body.email?.trim() ?? "",
    phone: body.phone?.trim() ?? "",
    message: body.message?.trim() ?? ""
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }

  try {
    const result = await forwardToGoogleForm(payload);
    await appendInquirySafely(payload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const config = getGoogleFormConfig();

    if (!config) {
      await appendInquirySafely(payload);
      return NextResponse.json({
        ok: true,
        deliveredToGoogleForm: false,
        message: "Thanks for submitting your inquiry."
      });
    }

    console.error("Inquiry delivery failed.", error);

    return NextResponse.json({ error: "Something went wrong while sending your inquiry." }, { status: 502 });
  }
}
