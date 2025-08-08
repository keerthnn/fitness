import { prisma } from 'fitness/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      workouts: true,
      bodyMetrics: true,
    },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { email } = body;

  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { email },
  });

  return NextResponse.json({ message: 'User updated', updated });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'User deleted' });
}
