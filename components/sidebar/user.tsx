"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';

export default function User() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;

  return (
    <Link href="/profile">
      <Button variant="outline" className="h-auto justify-start p-2 text-left">
        <div className="h-8 w-8 rounded-full bg-primary">
          <Image
            src={user.imageUrl}
            alt="Profile picture"
            width={32}
            height={32}
          />
        </div>
        <div className="ml-3">
          <div className="-mb-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          {user.fullName}
          </div>
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {user.emailAddresses[0].emailAddress}
          </div>
        </div>
      </Button>
    </Link>
  );
}
