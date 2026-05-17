export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

function todayString() {
  return new Date().toISOString().split('T')[0];
}

export async function GET() {
  const today = todayString();
  const [log, goalsRecord] = await Promise.all([
    prisma.foodLog.findMany({
      where: { userId: 'warrior-king', date: today },
      orderBy: { loggedAt: 'asc' },
    }),
    prisma.macroGoals.findUnique({ where: { userId: 'warrior-king' } }),
  ]);

  const goals = goalsRecord ?? {
    calories: 2800, protein: 200, carbs: 250, fat: 80, fiber: 35,
  };

  return NextResponse.json({ log, goals });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const entry = await prisma.foodLog.create({
    data: {
      userId: 'warrior-king',
      date: todayString(),
      foodName: body.foodName,
      category: body.category ?? 'other',
      mealType: body.mealType ?? 'snack',
      servingSize: body.servingSize ?? 100,
      servingUnit: body.servingUnit ?? 'g',
      calories: body.calories ?? 0,
      protein: body.protein ?? 0,
      carbs: body.carbs ?? 0,
      fat: body.fat ?? 0,
      fiber: body.fiber ?? 0,
      sugar: body.sugar ?? 0,
      healthGrade: body.healthGrade ?? 'B',
    },
  });
  return NextResponse.json({ entry }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.foodLog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
