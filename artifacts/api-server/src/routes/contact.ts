import { Router, type IRouter } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { SendContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SendContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const { name, email, message } = parsed.data;

  const [msg] = await db
    .insert(contactMessagesTable)
    .values({ name, email, message })
    .returning();

  res.status(201).json({
    id: msg.id,
    name: msg.name,
    email: msg.email,
    message: msg.message,
    createdAt: msg.createdAt.toISOString(),
  });
});

export default router;
