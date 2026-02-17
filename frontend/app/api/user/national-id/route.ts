import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { baleId } = body;

    if (!baleId || typeof baleId !== "string") {
      return NextResponse.json(
        { ok: false, error: "Bale ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        baleId: baleId,
      },
      select: {
        nationalId: true,
        phone: true,
        firstName: true,
        lastName: true,
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
      phone: user.phone,
    });

  } catch (err) {
    console.error("[GET_USER_BY_BALE_ID]", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
