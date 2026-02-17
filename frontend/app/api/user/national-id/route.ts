// app/api/user/national-id/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ← adjust path to your Prisma client



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { ok: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const normalized = phone;

    if (!normalized) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Find user by normalized phone
    const user = await prisma.user.findFirst({
      where: {
        phone: normalized,
      },
      select: {
        nationalId: true,
        firstName: true,
        lastName: true,
        // add any other fields you might need
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      nationalId: user.nationalId,
    });
  } catch (err) {
    console.error("[GET_NATIONAL_ID]", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}