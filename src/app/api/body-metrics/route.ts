// app/api/body-metrics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from 'fitness/app/lib/prisma';


const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const bodyMetrics = await prisma.bodyMetric.findMany({
      where: { userId: decoded.userId },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(bodyMetrics);
  } catch (error) {
    console.error('Body metrics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch body metrics' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const body = await req.json();
    
    const { weightKg, bodyFatPct, date } = body;

    if (!weightKg) {
      return NextResponse.json({ error: 'Weight is required' }, { status: 400 });
    }

    const bodyMetric = await prisma.bodyMetric.create({
      data: {
        userId: decoded.userId,
        weightKg: parseFloat(weightKg),
        bodyFatPct: bodyFatPct ? parseFloat(bodyFatPct) : null,
        date: date ? new Date(date) : new Date(),
      }
    });

    return NextResponse.json(bodyMetric);
  } catch (error) {
    console.error('Body metric creation error:', error);
    return NextResponse.json({ error: 'Failed to create body metric' }, { status: 500 });
  }
}