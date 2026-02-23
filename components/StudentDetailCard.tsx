'use client';

import { useState } from 'react';
import { StudentInfo } from '@/lib/types';
import { formatCurrency } from '@/lib/vietnameseUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Copy, User, BookOpen, Users, DollarSign, FileText, Receipt } from 'lucide-react';

interface StudentDetailCardProps {
  student: StudentInfo;
}

export function StudentDetailCard({ student }: StudentDetailCardProps) {
  const [copied, setCopied] = useState(false);

  const transferContent = student.transferContent || 'Không có thông tin';

  const handleCopy = () => {
    navigator.clipboard.writeText(transferContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg">
      {/* Header with student name and alert badge */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Thông tin học phí</h2>
        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-1">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          Chưa nộp
        </div>
      </div>

      {/* Student Information Section */}
      <div className="space-y-4 mb-6">
        {/* Name */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <User className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Họ và tên</p>
            <p className="text-base font-semibold text-gray-800">{student.name}</p>
          </div>
        </div>

        {/* Class */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Lớp</p>
            <p className="text-base font-semibold text-gray-800">{student.class}</p>
          </div>
        </div>

        {/* Number of meals */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Users className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Số bữa</p>
            <p className="text-base font-semibold text-gray-800">{student.meals}</p>
          </div>
        </div>

        {/* Meal Cost */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Tiền ăn</p>
            <p className="text-base font-semibold text-gray-800">{formatCurrency(student.mealCost)}</p>
          </div>
        </div>

        {/* Service Fee */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Receipt className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Chi phí phục vụ</p>
            <p className="text-base font-semibold text-gray-800">{formatCurrency(student.serviceFee)}</p>
          </div>
        </div>

        {/* Initial Cost */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Receipt className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Chi phí ban đầu</p>
            <p className="text-base font-semibold text-gray-800">{formatCurrency(student.initialCost)}</p>
          </div>
        </div>

        {/* Additional Cost */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Receipt className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Chi phí bổ sung</p>
            <p className="text-base font-semibold text-gray-800">{formatCurrency(student.additionalCost)}</p>
          </div>
        </div>

        {/* Electricity Cost */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Receipt className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Tiền điện điều hòa</p>
            <p className="text-base font-semibold text-gray-800">{formatCurrency(student.electricityCost)}</p>
          </div>
        </div>

        {/* Total Amount - Highlighted */}
        <div className="flex items-start gap-4 my-6 pt-4 border-t-2 border-gray-300">
          <div className="flex-shrink-0">
            <DollarSign className="w-5 h-5 text-blue-600 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Tổng tiền</p>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(student.totalCost)}</p>
          </div>
        </div>

        {/* Notes */}
        {student.notes && (
          <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
            <div className="flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 font-medium">Ghi chú</p>
              <p className="text-base text-gray-800">{student.notes}</p>
            </div>
          </div>
        )}

        {/* Transfer Content */}
        <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
          <div className="flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium mb-2">Nội dung chuyển khoản</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-800 break-all">
                {transferContent}
              </code>
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="flex-shrink-0 hover:bg-gray-200"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-gray-600" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      {student.qrCode && (
        <div className="pt-6 border-t border-gray-200">
          <p className="text-center text-sm font-semibold text-gray-700 mb-4">QR Code Chuyển Khoản</p>
          <div className="flex justify-center">
            <img
              src={student.qrCode}
              alt="QR Code chuyển khoản"
              className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
