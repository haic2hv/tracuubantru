'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SearchForm } from '@/components/SearchForm';
import { StudentDetailCard } from '@/components/StudentDetailCard';
import { StudentInfo, SearchResponse } from '@/lib/types';
import { Loader } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<StudentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (name: string, className: string) => {
    if (!name.trim() && !className.trim()) {
      setError('Vui lòng nhập họ tên hoặc lớp để tìm kiếm');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await fetch('/api/students/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          class: className.trim(),
        }),
      });

      const data: SearchResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Không thể tìm kiếm dữ liệu');
      }

      setSearchResults(data.data || []);
      
      if (!data.data || data.data.length === 0) {
        setError('Không tìm thấy kết quả. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(errorMessage);
      console.error('[v0] Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
          {/* School Logo */}
          <div className="mb-6">
            <Image
              src="/school-logo.png"
              alt="Logo Trường THCS Hùng Vương"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Subtitle - Main Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#EE730C' }}>
            TRA CỨU BÁN TRÚ
          </h1>

          {/* Description */}
          <p className="text-center text-gray-600 text-base max-w-2xl">
            Để tra cứu tiền bán trú, vui lòng nhập họ tên học sinh và lớp của con vào các trường bên dưới
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-blue-600 mr-2" size={24} />
            <span className="text-gray-600">Đang tìm kiếm...</span>
          </div>
        )}

        {/* Results Cards */}
        {searchResults.length > 0 && !isLoading && (
          <section className="space-y-6">
            {searchResults.map((student, index) => (
              <StudentDetailCard key={index} student={student} />
            ))}
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          Được tạo bởi{' '}
          <a
            href="https://tracuuhp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Hệ thống tra cứu HP
          </a>
          {' '}năm 2026
        </div>
      </footer>
    </main>
  );
}
