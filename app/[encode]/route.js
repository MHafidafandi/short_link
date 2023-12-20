import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const response = await prisma.shortlink.findUnique({ where: { encode_url: params.encode } });

    if (!response) {
      return new Response(JSON.stringify({ error: 'Shortlink not found' }), { status: 404 });
    }

    const long_url = response.long_url;

    return NextResponse.redirect(long_url, { status: 302 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
