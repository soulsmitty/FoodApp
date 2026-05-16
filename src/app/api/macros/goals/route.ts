import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const goals = await prisma.macroGoals.upsert({
    where: { userId: 'warrior-king' },
    update: {
      calories: body.calories,
      protein: body.protein,
      carbs: body.carbs,
      fat: body.fat,
      fiber: body.fiber,
    },
    create: {
      userId: 'warrior-king',
      calories: body.calories ?? 2800,
      protein: body.protein ?? 200,
      carbs: body.carbs ?? 250,
      fat: body.fat ?? 80,
      fiber: body.fiber ?? 35,
    },
  });
  return NextResponse.json({ goals });
}
