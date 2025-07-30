import { NextRequest, NextResponse } from 'next/server';
import { VladikavkazParser } from '../../../utils/vladikavkazParser';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const districtId = searchParams.get('districtId');
  const type = searchParams.get('type');

  try {
    switch (action) {
      case 'districts':
        const districts = await VladikavkazParser.getAllDistricts();
        return NextResponse.json({ districts });

      case 'district':
        if (!districtId) {
          return NextResponse.json(
            { error: 'District ID is required' },
            { status: 400 }
          );
        }
        const district = await VladikavkazParser.getDistrictById(parseInt(districtId));
        if (!district) {
          return NextResponse.json(
            { error: 'District not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ district });

      case 'attractions':
        const attractions = await VladikavkazParser.getAllAttractions();
        return NextResponse.json({ attractions });

      case 'attractionsByType':
        if (!type) {
          return NextResponse.json(
            { error: 'Type is required' },
            { status: 400 }
          );
        }
        const attractionsByType = await VladikavkazParser.searchAttractionsByType(type);
        return NextResponse.json({ attractions: attractionsByType });

      case 'stats':
        const stats = await VladikavkazParser.getCityStats();
        return NextResponse.json({ stats });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: districts, district, attractions, attractionsByType, stats' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in Vladikavkaz API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { districtId, updates } = body;

    if (!districtId || !updates) {
      return NextResponse.json(
        { error: 'District ID and updates are required' },
        { status: 400 }
      );
    }

    const success = await VladikavkazParser.updateDistrictData(districtId, updates);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'District data updated successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to update district data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating district data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 