import { DBConnect } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import FormModel from "@/models/form.model";

export async function POST(request: NextRequest) {
  try {
    await DBConnect();
    const body = await request.json();
    const formData = new FormModel(body);
    const result = await formData.save();
    return NextResponse.json(
      {
        message: "Form data successfully added to database",
        result,
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
