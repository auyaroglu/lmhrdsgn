'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    // ESC tuşunu dinle
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Açıkken body scroll'u engelle
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col">
            <div className="flex justify-between items-center px-8 py-6">
                <Image src="/images/logo.svg" alt="Lumhar Design Logo" width={40} height={40} />
                <button onClick={onClose} aria-label="Menüyü Kapat">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 pt-20">
                <a
                    href="#works"
                    className="font-dystopian text-4xl text-black hover:text-[#E0600A] transition-colors"
                    onClick={onClose}
                >
                    Works
                </a>
                <a
                    href="#about"
                    className="font-dystopian text-4xl text-black hover:text-[#E0600A] transition-colors"
                    onClick={onClose}
                >
                    About
                </a>
                <a
                    href="#events"
                    className="font-dystopian text-4xl text-black hover:text-[#E0600A] transition-colors"
                    onClick={onClose}
                >
                    Events
                </a>
                <a
                    href="#contact"
                    className="font-dystopian text-4xl text-black hover:text-[#E0600A] transition-colors"
                    onClick={onClose}
                >
                    Contact
                </a>
            </nav>
        </div>
    );
}
