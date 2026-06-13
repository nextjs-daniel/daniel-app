import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // TODO: Save to database
    // Example: await db.submissions.create({ data });

    // TODO: Send confirmation email
    // Example: await sendEmail({ to: data.email, subject: "Confirmación de registro", ... });

    console.log("Form submission received:", data);

    return NextResponse.json({ success: true, message: "Registro exitoso" });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error al procesar el registro" },
      { status: 500 }
    );
  }
}
