import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { userAuthSchema } from "@/lib/validations/auth";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const {
    email,
    name,
    password
  } = userAuthSchema.parse(body);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user);
}
