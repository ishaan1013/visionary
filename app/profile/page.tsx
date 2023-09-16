import { UserProfile } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
 
const UserProfilePage = () => {
    return (
        <main className="flex h-screen w-screen items-start justify-start overflow-hidden">
          <SignedIn>
            <Sidebar />
          </SignedIn>
          <div className="flex w-full flex-col items-center  px-4 py-8 lg:px-8 xl:px-16">
            <UserProfile />
          </div>
        </main>
      );
}
 
export default UserProfilePage;