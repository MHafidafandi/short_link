import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { url_panjang, encode } = await request.json();

    if (!url_panjang || !encode) {
      throw new Error('Invalid URL or encode');
    }

    await checkUrl(url_panjang);

    const existingShortlink = await prisma.shortlink.findUnique({
      where: { encode_url: encode },
    });

    if (existingShortlink) {
      throw new Error('nama yang anda inginkan telah digunakan');
    }

    let removedSpacesText = encode.split(' ').join('');
    // Create new shortlink
    const newShortlink = await prisma.shortlink.create({
      data: { encode_url: removedSpacesText, long_url: url_panjang },
    });

    await prisma.$disconnect();
    return new Response(JSON.stringify(newShortlink), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

async function checkUrl(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    throw new Error('Invalid URL');
  }
}

export async function GET(request) {
  try {
    const totalPosts = await prisma.shortlink.count();

    return new Response(JSON.stringify(totalPosts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
