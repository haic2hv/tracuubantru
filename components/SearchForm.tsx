'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchFormProps {
  onSearch: (name: string, className: string) => Promise<void>;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSearch(name, className);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Full Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Ví dụ: Nguyễn Văn An"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 text-base"
          />
        </div>

        {/* Class Input */}
        <div className="space-y-2">
          <Label htmlFor="class" className="text-base font-medium">
            Lớp <span className="text-red-500">*</span>
          </Label>
          <Input
            id="class"
            placeholder="Ví dụ: 6A"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="h-10 text-base"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-6"
      >
        {isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
      </Button>
    </form>
  );
}
