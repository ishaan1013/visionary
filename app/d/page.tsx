import CreateNote from "@/components/create";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const authUser = await currentUser();

  // if (!authUser) {
  //   return redirect("/sign-up");
  // }

  const upload = searchParams.method === "upload";

  return (
    <div className="flex h-full w-full flex-col items-start overflow-y-auto  px-4 py-8 lg:px-8 xl:px-16">
      <div className="mb-8 text-xl font-semibold">
        Note Generation{" "}
        <span className="ml-2 bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">
          {upload ? "— Upload Content" : "— Live Analysis"}
        </span>
      </div>
      <CreateNote upload={upload} />
    </div>
  );
}
