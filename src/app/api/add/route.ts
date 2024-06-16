import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = new MongoClient(process.env.DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    const db = client.db("RedPlanetQuest");

    const doc = request.body;
    const p = await db.collection("form").insertOne(doc);
    NextResponse.json({ p }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
