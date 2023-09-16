import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Editor } from "novel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
      <div className="mb-4 flex w-full items-center">
        <Input placeholder="Document Name" />
      </div>
      <Editor
        editorProps={{
          attributes: {
            class: "prose-base prose-zinc",
          },
        }}
        className="!font-satoshi w-full border-none bg-transparent p-0 px-8 shadow-none lg:px-4 xl:px-0"
      />
    </div>
  );
}
