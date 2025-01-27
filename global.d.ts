import { MongoClient } from "mongodb";

declare global {
  mongo: {
    client: MongoClient | null;
    promise: Promise<MongoClient> | null;
  }
}

export {};
