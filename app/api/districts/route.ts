import { NextRequest, NextResponse } from 'next/server';
import { MapService } from '../../../services/mapService';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('id');

  try {
    if (districtId) {
      // Получить информацию о конкретном районе
      const districtInfo = await MapService.getDistrictInfo(parseInt(districtId));
      
      if (!districtInfo) {
        return NextResponse.json(
          { error: 'District not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(districtInfo);
    } else {
      // Получить статистику по всем районам
      const stats = await MapService.getDistrictStats();
      return NextResponse.json(stats);
    }
  } catch (error) {
    console.error('Error fetching district data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { districtId, type } = body;

    if (!districtId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Здесь будет логика для добавления новой информации о районе
    // Например, обновление количества постов, добавление достопримечательности и т.д.

    return NextResponse.json({
      success: true,
      message: 'District information updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 