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
    const { id, name } = body;

    if (!id || !name) {
      return new Response("Bad request: missing id or name", {
        status: 400,
      });
    }

    const data = await prisma.folder.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error(error);
    return new Response("Caught error - Bad request", { status: 400 });
  }
}
