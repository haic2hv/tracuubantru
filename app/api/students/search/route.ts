import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { StudentInfo, SearchResponse } from '@/lib/types';
import { removeDiacritics } from '@/lib/vietnameseUtils';

/**
 * Initialize Google Sheets API client using API Key
 */
async function getGoogleSheetsClient() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_SHEETS_API_KEY environment variable is not set');
  }

  return google.sheets({ version: 'v4', auth: apiKey });
}

/**
 * Parse row data from Google Sheets into StudentInfo object
 * Row format: [STT, Name, Class, Meals, MealCost, ServiceFee, InitialCost, AdditionalCost, ElectricityCost, TotalCost, Notes, ND CK, TrangThai, QRCode]
 */
function parseStudentRow(row: (string | number)[]): StudentInfo | null {
  if (!row || row.length < 2) return null;

  return {
    name: String(row[1] || '').trim(),
    class: String(row[2] || '').trim(),
    meals: row[3] || '',
    mealCost: row[4] || 0,
    serviceFee: row[5] || 0,
    initialCost: row[6] || 0,
    additionalCost: row[7] || 0,
    electricityCost: row[8] || 0,
    totalCost: row[9] || 0,
    notes: String(row[10] || '').trim(),
    transferContent: row.length > 11 ? String(row[11] || '').trim() : undefined,
    qrCode: row.length > 13 ? String(row[13] || '').trim() : undefined,
  };
}

/**
 * Fetch student data from Google Sheets
 */
async function fetchStudentData(): Promise<StudentInfo[]> {
  const sheets = await getGoogleSheetsClient();
  const sheetId = process.env.SHEET_ID;
  const sheetName = process.env.SHEET_NAME;

  if (!sheetId) {
    throw new Error('SHEET_ID environment variable is not set');
  }

  if (!sheetName) {
    throw new Error('SHEET_NAME environment variable is not set');
  }

  try {
    console.log('[v0] Fetching from Google Sheets:', { sheetId, sheetName });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:N`, // Columns A to N (14 columns as per your structure)
    });

    const rows = response.data.values || [];
    console.log('[v0] Raw rows from Google Sheets:', rows.length, rows.length > 0 ? rows[0] : 'No rows');
    
    // Skip header row (row 0) and parse data
    const students: StudentInfo[] = rows
      .slice(1)
      .map(parseStudentRow)
      .filter((student): student is StudentInfo => student !== null);

    console.log('[v0] Parsed students:', students.length);
    
    return students;
  } catch (error) {
    console.error('[v0] Error fetching from Google Sheets:', error);
    throw error;
  }
}

/**
 * Search students by name and class
 */
function searchStudents(
  students: StudentInfo[],
  searchName?: string,
  searchClass?: string
): StudentInfo[] {
  let results = students;

  // Filter by name (partial match, case-insensitive, diacritics-insensitive)
  if (searchName && searchName.trim()) {
    const searchNameNormalized = removeDiacritics(searchName.toLowerCase());
    results = results.filter(student => {
      const studentNameNormalized = removeDiacritics(student.name.toLowerCase());
      return studentNameNormalized.includes(searchNameNormalized);
    });
  }

  // Filter by class (exact match)
  if (searchClass && searchClass.trim()) {
    results = results.filter(student => student.class === searchClass.trim());
  }

  return results;
}

/**
 * POST /api/students/search
 * Search for students by name and class
 */
export async function POST(request: NextRequest): Promise<NextResponse<SearchResponse>> {
  try {
    const body = await request.json();
    const { name, class: className } = body;

    console.log('[v0] Search request:', { name, className });

    // Fetch data from Google Sheets
    const students = await fetchStudentData();
    console.log('[v0] Fetched students:', students.length);

    // Search with filters
    const results = searchStudents(students, name, className);
    console.log('[v0] Search results:', results.length);

    return NextResponse.json({
      success: true,
      data: results,
      message: `Found ${results.length} student(s)`,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] Search error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: 'Failed to search students',
      },
      { status: 500 }
    );
  }
}
