import PostHandler from "@/components/PostHandler";
import { getAllDocuments } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

async function Page() {
  let sensors: tinkerforgeDTO[] = await getAllDocuments();

  return <PostHandler sensors={sensors} />;
}

export default Page;
