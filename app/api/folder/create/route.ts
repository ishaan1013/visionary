import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new Response("Bad request: missing name", {
        status: 400,
      });
    }

    const data = await prisma.folder.create({
      data: {
        name: body.name,
        userId: user.id,
      },
    });

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error(error);
    return new Response("Caught error - Bad request", { status: 400 });
  }
}
