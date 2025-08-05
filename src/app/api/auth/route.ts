import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from 'fitness/app/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, mode } = body; // mode: 'register' | 'login'

  if (!email || !password || !['register', 'login'].includes(mode)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  if (mode === 'register') {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered', userId: user.id });
  }

  if (mode === 'login') {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ token, userId: user.id });
  }

  return NextResponse.json({ error: 'Unsupported mode' }, { status: 400 });
}
