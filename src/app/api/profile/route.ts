// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "fitness/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// GET current user's profile
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        height: true,
        currWeight: true,
        goalWeight: true,
        fitnessLevel: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// PATCH update current user's profile
export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const data = await req.json();

    const {
      name,
      email,
      age,
      height,
      currWeight,
      goalWeight,
      fitnessLevel,
    } = data;

    // Optional: add validation for fields here
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        name,
        email,
        age: age ? Number(age) : null,
        height,
        currWeight: currWeight ? Number(currWeight) : null,
        goalWeight: goalWeight ? Number(goalWeight) : null,
        fitnessLevel,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        height: true,
        currWeight: true,
        goalWeight: true,
        fitnessLevel: true,
      },
    });

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
