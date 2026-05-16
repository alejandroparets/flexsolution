import nodemailer from "nodemailer";
import { logger } from "./logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendAppointmentNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  notes?: string | null;
}) {
  try {
    await transporter.sendMail({
      from: `"Gestión+ Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nueva cita solicitada: ${data.service}`,
      html: `
        <h2>Nueva solicitud de cita</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Nombre</td><td style="padding:8px">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Teléfono</td><td style="padding:8px">${data.phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Servicio</td><td style="padding:8px">${data.service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Fecha preferida</td><td style="padding:8px">${data.preferredDate}</td></tr>
          ${data.notes ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Notas</td><td style="padding:8px">${data.notes}</td></tr>` : ""}
        </table>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send appointment email");
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await transporter.sendMail({
      from: `"Gestión+ Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Nombre</td><td style="padding:8px">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Mensaje</td><td style="padding:8px">${data.message}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666">Responde directamente a: <a href="mailto:${data.email}">${data.email}</a></p>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
  }
}
