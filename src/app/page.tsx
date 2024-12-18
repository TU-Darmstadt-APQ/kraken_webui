import Dashboard from "./components/client/Dashboard";
import { StartSetup, ValidateMongoDBConnection } from "./components/mongodb/DBConnectionSetup"

export default async function Page() {
  const startdb = await StartSetup();
  const validatedDB = await ValidateMongoDBConnection();
  return (
      <Dashboard startdb={startdb} validatedDB={validatedDB} />
  )
}
