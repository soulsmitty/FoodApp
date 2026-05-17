import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const item = await prisma.pantryItem.update({
    where: { id: params.id },
    data: { quantity: body.quantity },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.pantryItem.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
