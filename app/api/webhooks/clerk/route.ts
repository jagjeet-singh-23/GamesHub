import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  //   Get Headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  //   If no headers, return 400
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request, no svix headers", { status: 400 });
  }

  //   Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  //   Create a new Svix instance
  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  //   Verify the payload
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook payload:", error);
    return new Response("Error occured", { status: 400 });
  }

  //   Get the Id and type
  const type = event.type;
  if (type === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s stream`,
          },
        },
      },
    });
  }

  if (type === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.user.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (type === "user.deleted") {
    await resetIngresses(payload.data.id);
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
