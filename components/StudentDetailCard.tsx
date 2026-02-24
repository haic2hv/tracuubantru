'use client';

import { useState } from 'react';
import { StudentInfo } from '@/lib/types';
import { formatCurrency } from '@/lib/vietnameseUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Copy, User, BookOpen, Users, DollarSign, FileText, Receipt, Download, X } from 'lucide-react';

interface StudentDetailCardProps {
  student: StudentInfo;
}

export function StudentDetailCard({ student }: StudentDetailCardProps) {
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const transferContent = student.transferContent || 'Không có thông tin';

  const handleCopy = () => {
    navigator.clipboard.writeText(transferContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = async () => {
    if (!student.qrCode) return;
    
    try {
      const link = document.createElement('a');
      link.href = student.qrCode;
      link.download = `QR_${student.name}_${student.class}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('[v0] Error downloading QR code:', error);
    }
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg">
      {/* Header with student name */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">{student.name} - Lớp {student.class}</h2>
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
            <button
              onClick={() => setQrModalOpen(true)}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              title="Bấm để xem rõ hơn"
            >
              <img
                src={student.qrCode}
                alt="QR Code chuyển khoản"
                className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg p-2"
              />
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalOpen && student.qrCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-md relative">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-gray-600" />
            </button>

            <h3 className="text-lg font-bold text-gray-800 mb-2 md:mb-4">QR Code Chuyển Khoản</h3>
            <p className="text-sm text-gray-600 mb-4">{student.name} - Lớp {student.class}</p>

            <div className="flex justify-center mb-4 md:mb-6">
              <img
                src={student.qrCode}
                alt="QR Code chuyển khoản"
                className="w-40 h-40 md:w-56 md:h-56 object-contain border-2 border-gray-300 rounded-lg p-2 md:p-4"
              />
            </div>

            <div className="flex gap-2 md:gap-3 justify-center">
              <Button
                onClick={handleDownloadQR}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
              >
                <Download size={16} />
                Tải xuống
              </Button>
              <Button
                onClick={() => setQrModalOpen(false)}
                variant="outline"
                className="text-sm md:text-base"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
