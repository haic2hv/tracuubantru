'use client';

import { StudentInfo } from '@/lib/types';
import { formatCurrency } from '@/lib/vietnameseUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ResultsTableProps {
  students: StudentInfo[];
  onStudentSelect: (student: StudentInfo) => void;
}

export function ResultsTable({ students, onStudentSelect }: ResultsTableProps) {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Không có kết quả tìm kiếm. Vui lòng nhập thông tin và tìm kiếm lại.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="border">
        <TableHeader className="bg-orange-500">
          <TableRow>
            <TableHead className="text-white font-semibold">Họ và tên</TableHead>
            <TableHead className="text-white font-semibold">Lớp</TableHead>
            <TableHead className="text-white font-semibold text-right">Số bữa</TableHead>
            <TableHead className="text-white font-semibold text-right">Tiền ăn</TableHead>
            <TableHead className="text-white font-semibold text-right">Chi phí phục vụ</TableHead>
            <TableHead className="text-white font-semibold text-right">Chi phí ban đầu</TableHead>
            <TableHead className="text-white font-semibold text-right">Chi phí bổ sung</TableHead>
            <TableHead className="text-white font-semibold text-right">Tiền điện</TableHead>
            <TableHead className="text-white font-semibold text-right">Tổng tiền</TableHead>
            <TableHead className="text-white font-semibold">Ghi chú</TableHead>
            <TableHead className="text-white font-semibold">QR Chuyển khoản</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow
              key={index}
              onClick={() => onStudentSelect(student)}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell className="text-right">{student.meals}</TableCell>
              <TableCell className="text-right">{formatCurrency(student.mealCost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(student.serviceFee)}</TableCell>
              <TableCell className="text-right">{formatCurrency(student.initialCost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(student.additionalCost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(student.electricityCost)}</TableCell>
              <TableCell className="text-right font-semibold">{formatCurrency(student.totalCost)}</TableCell>
              <TableCell>{student.notes}</TableCell>
              <TableCell>
                {student.qrCode ? (
                  <img 
                    src={student.qrCode} 
                    alt="QR Code chuyển khoản" 
                    className="w-16 h-16 object-contain cursor-pointer hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Optional: Show full size QR in modal
                    }}
                  />
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
