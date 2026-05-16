import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  const items = await prisma.pantryItem.findMany({
    where: { userId: 'warrior-king' },
    orderBy: { addedAt: 'desc' },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.pantryItem.create({
    data: {
      userId: 'warrior-king',
      name: body.name,
      category: body.category ?? 'other',
      quantity: body.quantity ?? 1,
      unit: body.unit ?? 'item',
      healthGrade: body.healthGrade ?? 'B',
      gradeScore: body.gradeScore ?? 70,
      calories: body.calories ?? 0,
      protein: body.protein ?? 0,
      carbs: body.carbs ?? 0,
      fat: body.fat ?? 0,
      fiber: body.fiber ?? 0,
      sugar: body.sugar ?? 0,
      sodium: body.sodium ?? 0,
      imageUrl: body.imageUrl ?? null,
      barcode: body.barcode ?? null,
      notes: body.notes ?? null,
    },
  });
  return NextResponse.json({ item }, { status: 201 });
}
