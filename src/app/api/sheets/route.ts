import { NextResponse } from 'next/server';
import { getAllSheetsData } from '@/lib/google-sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getAllSheetsData();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error: unknown) {
    console.error(
      'Google Sheets API error:',
      error instanceof Error ? error.message : 'Unknown error',
    );

    return NextResponse.json(
      { error: 'Không thể đọc dữ liệu Google Sheets.' },
      { status: 500 },
    );
  }
}
