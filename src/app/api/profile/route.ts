// app/api/profile/route.ts
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
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get total workouts
    const totalWorkouts = await prisma.workout.count({
      where: { userId: decoded.userId }
    });

    // Get latest body metrics
    const latestBodyMetric = await prisma.bodyMetric.findFirst({
      where: { userId: decoded.userId },
      orderBy: { date: 'desc' }
    });

    // Get body metrics history for progress calculation
    const bodyMetrics = await prisma.bodyMetric.findMany({
      where: { userId: decoded.userId },
      orderBy: { date: 'asc' }
    });

    // Calculate progress (comparing first vs latest weight)
    let progressPercentage = 0;
    if (bodyMetrics.length >= 2) {
      const firstWeight = bodyMetrics[0].weightKg;
      const currentWeight = latestBodyMetric?.weightKg || firstWeight;
      const goalWeight = firstWeight * 0.9; // Assume 10% weight loss goal
      const totalToLose = firstWeight - goalWeight;
      const lostSoFar = firstWeight - currentWeight;
      progressPercentage = Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100));
    }

    const profileData = {
      id: user.id,
      email: user.email,
      //name: null, // Not in your schema
      //age: null, // Not in your schema
      //height: null, // Not in your schema
      currentWeight: latestBodyMetric?.weightKg ? Math.round(latestBodyMetric.weightKg * 2.204) : null, // Convert kg to lbs
      //goalWeight: null, // Could be calculated or stored separately
      //fitnessLevel: null, // Not in your schema
      bodyFatPct: latestBodyMetric?.bodyFatPct,
      totalWorkouts,
      memberSince: user.createdAt.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }),
      progressPercentage: Math.round(progressPercentage),
      weightHistory: bodyMetrics.map(metric => ({
        date: metric.date,
        weightKg: metric.weightKg,
        weightLbs: Math.round(metric.weightKg * 2.204),
        bodyFatPct: metric.bodyFatPct
      }))
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}