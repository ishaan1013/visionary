import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import NoteEditor from "@/components/editor";
import CreateNote from "@/components/create";

export default async function Page({ params }: { params: { id: string } }) {
  // const authUser = await currentUser();

  // if (!authUser) {
  //   return redirect("/sign-up");
  // }

  return (
    <div className="flex h-full w-full flex-col items-start overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
      <div className="mb-4 text-xl font-semibold">Note Generation</div>
      <CreateNote />
    </div>
  );
}
