import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  currentUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const authUser = await currentUser();

  if (!authUser) {
    return redirect("/sign-up");
  }

  const data = await prisma.document.findUnique({
    where: {
      id: params.id,
      userId: authUser.id,
    },
  });

  return null;
}
