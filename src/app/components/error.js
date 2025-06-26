import React from 'react'

export default function ErrorPage() {
    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 class="text-9xl font-extrabold text-blue-600">404</h1>
            <p class="text-2xl font-semibold text-gray-800 mt-4">Page not found</p>
            <p class="text-md text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
            <a href="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                Go to Homepage
            </a>
        </div>

    )
}
