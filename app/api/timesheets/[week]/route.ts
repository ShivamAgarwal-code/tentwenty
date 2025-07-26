import { NextRequest, NextResponse } from 'next/server';

const timesheetEntries: Record<string, any> = {
  '1': {
    startDate: '1 January, 2024',
    endDate: '5 January, 2024',
    tasks: {
      'Jan 1': [
        { id: 1, project: 'Dashboard UI', hours: 4 },
        { id: 2, project: 'Dashboard UI', hours: 4 },
      ],
      'Jan 2': [{ id: 3, project: 'Dashboard UI', hours: 4 }],
      'Jan 3': [],
      'Jan 4': [],
      'Jan 5': [],
    },
  },
  '3': {
    startDate: '15 January, 2024',
    endDate: '19 January, 2024',
    tasks: {
      'Jan 15': [
        { id: 1, project: 'API Integration', hours: 3 },
        { id: 2, project: 'API Integration', hours: 2 },
      ],
      'Jan 16': [],
      'Jan 17': [],
      'Jan 18': [],
      'Jan 19': [],
    },
  },
  '4': {
    startDate: '21 January, 2024',
    endDate: '26 January, 2024',
    tasks: {
      'Jan 21': [
        { id: 1, project: 'Homepage Development', hours: 4 },
        { id: 2, project: 'Homepage Development', hours: 4 },
      ],
      'Jan 22': [{ id: 3, project: 'Homepage Development', hours: 4 }],
      'Jan 23': [],
      'Jan 24': [],
      'Jan 25': [],
    },
  },
  '5': {
    startDate: '28 January, 2024',
    endDate: '1 February, 2024',
    tasks: {
      'Jan 28': [],
      'Jan 29': [],
      'Jan 30': [],
      'Jan 31': [],
      'Feb 1': [],
    },
  },
};

export async function GET(
  req: NextRequest, 
  context: { params: Promise<{ week: string }> }
) {
  const params = await context.params;
  const week = params.week;

  const weekData = timesheetEntries[week];

  if (!weekData) {
    return NextResponse.json({ error: 'Week not found' }, { status: 404 });
  }

  return NextResponse.json(weekData);
}