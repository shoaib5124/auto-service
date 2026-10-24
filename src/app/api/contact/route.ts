import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "../../lib/contact-validation";



export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 }
    );
  }

  // Server-side validation (never trust the browser)
  const { data, errors } = validateContact(body);
  if (!data) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form: missing environment variables.");
    return NextResponse.json(
      { error: "Der Versand ist derzeit nicht verfügbar." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const text = [
    "Neue Kontaktanfrage über die Website",
    "",
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    `Gewünschte Leistung: ${data.service || "—"}`,
    "",
    "Nachricht:",
    data.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      // Fixed subject: no user input in headers
      subject: "Neue Kontaktanfrage über die Website",
      text,
    });

    if (error) {
      console.error("Resend error:", error.name, error.message);
      return NextResponse.json(
        { error: "Die Nachricht konnte nicht gesendet werden." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return NextResponse.json(
      { error: "Die Nachricht konnte nicht gesendet werden." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}