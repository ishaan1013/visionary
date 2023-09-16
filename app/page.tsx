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

export default async function Page() {
  const authUser = await currentUser();

  if (!authUser) {
    return redirect("/sign-up");
  }

  return (
    <>
      <SignedOut>
        <Link href="/sign-up">
          <Button>Sign up</Button>
        </Link>
        <Link href="/sign-in">
          <Button>Log in</Button>
        </Link>
      </SignedOut>
    </>
  );
}
