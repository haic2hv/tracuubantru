'use client';

import { useState } from 'react';
import { StudentInfo } from '@/lib/types';
import { generateTransferContent, formatCurrency } from '@/lib/vietnameseUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import QRCode from 'qrcode.react';

interface TransferContentProps {
  student: StudentInfo;
}

export function TransferContent({ student }: TransferContentProps) {
  const [copied, setCopied] = useState(false);
  
  const transferContent = generateTransferContent(student.name, student.class);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(transferContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Transfer Content Card */}
      <Card className="p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Nội dung chuyển khoản
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
          <p className="text-gray-600 text-sm mb-2">Nội dung:</p>
          <p className="text-xl font-mono font-bold text-orange-600">
            {transferContent}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
          <p className="text-sm text-gray-600 mb-1">Số tiền cần chuyển:</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(student.totalCost)}
          </p>
        </div>

        <Button
          onClick={handleCopy}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check size={18} />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy size={18} />
              Sao chép nội dung chuyển khoản
            </>
          )}
        </Button>
      </Card>

      {/* QR Code Card */}
      <Card className="p-6 bg-white border border-gray-200 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 w-full text-center">
          Mã QR
        </h3>
        
        <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
          <QRCode
            value={transferContent}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Quét mã QR để xem nội dung chuyển khoản
        </p>
      </Card>
    </div>
  );
}
