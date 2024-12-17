import toast from "react-hot-toast";
import { getAllDocuments, StartSetup, ValidateMongoDBConnection } from "./DBConnectionSetup";
import React from "react";



export default async function DBConnector({ error,  documents }: { error: any, documents: any[] }) {
  React.useEffect(() => {
    console.log("\nmy error messsage\n" , error.message);
  }, [error]);
  if(error){
    toast.error(error.message)
  }

  
  console.log("\nprinting documents start\n");
  console.log(documents);
  console.log("\nprinting documents end\n");
  if (error){
    return (
      <span>error</span>
    )
  } else{
    return (
      <span>Connection successfully set up</span>
    )
  }
}

export async function getServerSideProps(){
    await StartSetup();
    const result = await ValidateMongoDBConnection();
    let documents = await getAllDocuments();
    return {
      props: {
        error: result?.error, // Pass the error object to the client component
        documents
      },
    };
}
