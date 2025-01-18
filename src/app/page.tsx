import { getAllDocuments } from "@/components/mongodb/DBConnector";
import PostHandler from "@/components/PostHandler";
import { Post } from "@/types";

async function Page() {
  let allDocs: Post[] = await getAllDocuments();
  return <PostHandler {...allDocs} />;
}

export default Page;
