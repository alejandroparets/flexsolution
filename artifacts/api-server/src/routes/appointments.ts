import { Router, type IRouter } from "express";
import { db, appointmentsTable } from "@workspace/db";
import { CreateAppointmentBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const { name, email, phone, service, preferredDate, notes } = parsed.data;

  const [appointment] = await db
    .insert(appointmentsTable)
    .values({
      name,
      email,
      phone,
      service,
      preferredDate,
      notes: notes ?? null,
    })
    .returning();

  res.status(201).json({
    id: appointment.id,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone,
    service: appointment.service,
    preferredDate: appointment.preferredDate,
    notes: appointment.notes,
    status: appointment.status,
    createdAt: appointment.createdAt.toISOString(),
  });
});

export default router;
