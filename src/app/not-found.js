"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  const handleRedirect = (e) => {
    e.preventDefault();
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">Page not found</p>
      <p className="text-md text-gray-500 mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <button
        onClick={handleRedirect}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        Go to Homepage
      </button>
    </div>
  );
}
