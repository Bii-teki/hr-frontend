import React from 'react'

export default function Footer() {
    return (
        <div className="text-center mt-30 space-y-2">
            <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                Release Notes
            </div>
            <div className="text-xs text-gray-500">
                version 20.22.11
            </div>
            <div className="text-xs text-gray-400">
                Copyright © 2023-24 HRM and services
            </div>
        </div>
    )
}
