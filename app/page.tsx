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
    <div className="flex h-full w-full flex-col items-center overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
      <SignedOut>
        <Link href="/sign-up">
          <Button>Sign up</Button>
        </Link>
        <Link href="/sign-in">
          <Button>Log in</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
