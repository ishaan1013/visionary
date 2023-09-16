import Link from "next/link";
import User from "./user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Content from "./content";

const getFolders = async (id: string) => {
  return await prisma.folder.findMany({
    where: {
      userId: id,
    },
    include: {
      documents: true,
    },
  });
};

const getDocuments = async (id: string) => {
  return await prisma.document.findMany({
    where: {
      userId: id,
    },
  });
};

export default async function Sidebar() {
  const authUser = await currentUser();

  if (!authUser) {
    return redirect("/sign-up");
  }

  const folderData = getFolders(authUser.id);
  const documentData = getDocuments(authUser.id);

  const [folders, documents] = await Promise.all([folderData, documentData]);

  return (
    <div className="flex h-screen max-h-screen w-full max-w-[16rem] flex-col justify-between border-r border-border px-4 py-8">
      <div className="flex flex-col items-start">
        <Link href="/">
          <div className="h-7 bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-xl font-semibold text-transparent">
            Visionary
          </div>
        </Link>

        <Content folders={folders} documents={documents} />
      </div>
      <User />
    </div>
  );
}
