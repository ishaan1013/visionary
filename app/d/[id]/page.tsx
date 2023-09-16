import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import NoteEditor from "@/components/editor";

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
    include: {
      folder: true,
    },
  });

  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-start overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
        <div className="mb-4 text-xl font-semibold">There's nothing here!</div>
        <div className="text-muted-foreground">
          Either this note does not exist, or you don't have access to it.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
      <NoteEditor data={data} />
    </div>
  );
}
