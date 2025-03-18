'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MobileMenu from './components/MobileMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const fixedNavbarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Mobil cihaz kontrolü
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // İlk yüklemede kontrol et
        checkMobile();

        // Pencere boyutu değiştiğinde kontrol et
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        // GSAP'ı kaydet
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Ana sayfa yüklendiğinde elementlerin ilk durumları
        gsap.set(heroImageRef.current, {
            scale: isMobile ? 0.9 : 0.7, // Mobilde daha büyük başlangıç
            opacity: 0.9,
            zIndex: 1,
            transformOrigin: 'center center',
        });

        // Başlangıçta sabit navbar'ı gizle
        gsap.set(fixedNavbarRef.current, {
            opacity: 0,
            y: -50,
        });

        // Overlay'i başlangıçta gizle
        gsap.set(overlayRef.current, {
            opacity: 0,
        });

        // Başlangıçta metinlerin siyah renkte olduğundan emin ol
        gsap.set(titleRef.current, {
            color: 'black',
            zIndex: 60,
        });

        gsap.set(textContentRef.current, {
            color: 'black',
            zIndex: 60,
        });

        // Ana timeline oluştur
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=1200',
                scrub: 1, // Daha yumuşak geçiş için scrub değeri artırıldı
                pin: true,
                anticipatePin: 1,
                markers: false,
            },
        });

        // Aşama 1: Sadece menü kaybolur
        mainTimeline.to(
            menuRef.current,
            {
                yPercent: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
            },
            0
        );

        // Aşağı ok animasyonunu değiştirdim - sadece video büyüdüğünde beyaz olacak
        mainTimeline.to(
            arrowRef.current ? arrowRef.current.querySelector('circle') : null,
            {
                fill: 'white',
                duration: 0.5,
                ease: 'power2.inOut',
            },
            5 // Video tamamen büyüdükten sonra gerçekleşecek
        );

        // Yazıların rengini değiştirme animasyonunu, video tam ekran olduktan sonraya taşıdım
        mainTimeline.to(
            titleRef.current,
            {
                color: 'white',
                duration: 1.5,
                ease: 'power2.inOut',
            },
            5.5 // Video tamamen büyüdükten sonra
        );

        mainTimeline.to(
            textContentRef.current,
            {
                color: 'white',
                duration: 1.5,
                ease: 'power2.inOut',
            },
            5.5 // Video tamamen büyüdükten sonra
        );

        // Görsel büyüme animasyonu - merkezden büyüme
        mainTimeline.to(
            heroImageRef.current,
            {
                scale: isMobile ? 1.8 : 1.5, // Mobilde daha büyük ölçek
                opacity: 1,
                zIndex: 50,
                ease: 'power1.inOut',
                duration: 3,
            },
            '+=0.3'
        );

        // Görsel tam ekran olurken - ayrı bir animasyon adımı
        mainTimeline.to(
            heroImageRef.current,
            {
                borderRadius: 0,
                duration: 1,
            },
            '+=1'
        );

        // Video tam ekran olduktan sonra navbar'ı göster
        mainTimeline.to(
            fixedNavbarRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.inOut',
            },
            '-=0.5'
        );

        // Başlığın konumunu düzenle (tamamen yeniden göstermek yerine)
        mainTimeline.to(
            titleRef.current,
            {
                y: isMobile ? 80 : 120, // Mobilde daha az aşağı it
                x: 0,
                left: 'auto',
                position: 'fixed',
                top: 0,
                duration: 1.5,
                ease: 'power2.inOut',
            },
            '-=0.1'
        );

        return () => {
            // Temizleme işlemi
            if (ScrollTrigger.getAll().length > 0) {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, [isMobile]); // isMobile değiştiğinde useEffect tekrar çalışacak

    return (
        <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section - İlk Ekran */}
            <section className="h-screen relative overflow-hidden">
                {/* Overlay - Artık görünmeyecek */}
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black z-40 pointer-events-none opacity-0"
                ></div>

                {/* Header içerik */}
                <div
                    ref={headerRef}
                    className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 md:px-20 py-4 sm:py-8"
                >
                    <div className="flex justify-between items-start">
                        <div ref={titleRef} className="z-60">
                            <h1 className="font-dystopian text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                                Welcome to
                                <br />
                                Lumhar Design
                            </h1>
                        </div>

                        <div ref={menuRef} className="flex items-center gap-4 sm:gap-8">
                            <nav className="hidden md:flex items-center gap-8">
                                <a
                                    href="#works"
                                    className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                                >
                                    Works
                                </a>
                                <a
                                    href="#about"
                                    className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                                >
                                    About
                                </a>
                                <a
                                    href="#events"
                                    className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                                >
                                    Events
                                </a>
                                <a
                                    href="#contact"
                                    className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                                >
                                    Contact
                                </a>
                            </nav>

                            <Image
                                src="/images/logo.svg"
                                alt="Lumhar Design Logo"
                                width={40}
                                height={40}
                                className="hidden md:block"
                            />

                            <button
                                className="md:hidden flex items-center justify-center"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Menüyü Aç"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 12H21"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M3 6H21"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M3 18H21"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video tam ekran olduktan sonra görünecek sabit navbar */}
                <div
                    ref={fixedNavbarRef}
                    className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-20 py-4 sm:py-6 flex justify-between items-center bg-white bg-opacity-95 shadow-sm"
                >
                    <div className="flex items-center font-dystopian text-2xl sm:text-3xl md:text-4xl text-black">
                        Lumhar Design
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="#works"
                            className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                        >
                            Works
                        </a>
                        <a
                            href="#about"
                            className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                        >
                            About
                        </a>
                        <a
                            href="#events"
                            className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                        >
                            Events
                        </a>
                        <a
                            href="#contact"
                            className="font-dystopian text-xl text-black hover:text-[#E0600A] transition-colors border-b border-transparent hover:border-[#E0600A]"
                        >
                            Contact
                        </a>
                        <a href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Lumhar Design Logo"
                                width={50}
                                height={50}
                            />
                        </a>
                    </nav>

                    <button
                        className="md:hidden flex items-center justify-center"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Menüyü Aç"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 12H21"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M3 6H21"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M3 18H21"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Ana görsel */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-8 md:px-0 md:max-w-5xl">
                    <div
                        ref={heroImageRef}
                        className="relative w-full aspect-video overflow-hidden rounded-md mx-auto"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <video
                                src="/videos/video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="mx-auto rounded-3xl w-full h-auto object-cover min-h-full min-w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Alt Bilgi Bölümü */}
                <div
                    ref={textContentRef}
                    className="absolute bottom-24 sm:bottom-28 md:bottom-32 right-4 sm:right-10 md:right-20 max-w-[250px] sm:max-w-xs md:max-w-md z-40"
                >
                    <p className="font-dystopian text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Lumhar Design is a multidiscipliner design studio that bring out the best in
                        you.
                    </p>
                </div>

                {/* Aşağı Ok - Orta alt kısımda konumlandırıldı */}
                <div
                    ref={arrowRef}
                    className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-50"
                >
                    <a href="#works" className="animate-bounce block">
                        <svg
                            width="22"
                            height="49"
                            viewBox="0 0 22 49"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_146_14)">
                                <path
                                    d="M0.0201366 18.45C0.0201366 15.73 -0.0298634 13.02 0.0301366 10.31C0.140137 5.28999 3.61014 1.21999 8.54014 0.209993C13.2401 -0.750007 18.1101 1.68999 20.0701 6.17999C20.6601 7.52999 20.9901 9.08999 21.0201 10.56C21.1301 15.81 21.1101 21.07 21.0501 26.32C21.0001 31.68 17.1101 36.13 12.0301 36.78C6.64014 37.46 1.73014 34.22 0.370137 29.03C0.120137 28.08 0.0401366 27.06 0.0201366 26.07C-0.0298634 23.53 0.000136558 20.99 0.000136558 18.45H0.0201366ZM19.2901 18.48C19.2901 15.77 19.3301 13.05 19.2901 10.34C19.2001 5.52999 15.3201 1.76999 10.5101 1.77999C5.75014 1.78999 1.85014 5.55999 1.80014 10.31C1.74014 15.73 1.77014 21.16 1.80014 26.59C1.80014 28.76 2.62014 30.65 4.08014 32.26C6.49014 34.92 10.2701 35.82 13.6401 34.56C16.9601 33.32 19.2401 30.17 19.3001 26.62C19.3501 23.91 19.3001 21.2 19.3101 18.48H19.2901Z"
                                    fill="#E86B09"
                                />
                                <path
                                    d="M10.6 46.62C11.23 45.94 11.77 45.32 12.35 44.73C13.27 43.79 14.2 42.87 15.13 41.94C15.57 41.49 16.06 41.18 16.6 41.73C17.14 42.28 16.81 42.76 16.37 43.2C14.71 44.85 13.07 46.51 11.4 48.16C10.73 48.83 10.35 48.82 9.66997 48.13C8.00997 46.48 6.35997 44.82 4.69997 43.17C4.25997 42.73 3.90997 42.24 4.43997 41.7C5.00997 41.11 5.50997 41.47 5.96997 41.94C7.46997 43.46 8.96997 44.97 10.61 46.61L10.6 46.62Z"
                                    fill="#E86B09"
                                />
                                <path
                                    d="M9.67034 7.89999C9.67034 7.32999 9.57034 6.73999 9.71034 6.19999C9.80034 5.84999 10.1903 5.38999 10.5203 5.31999C11.0503 5.20999 11.4003 5.62999 11.4103 6.20999C11.4103 7.34999 11.4703 8.48999 11.3703 9.61999C11.3403 9.94999 10.8903 10.42 10.5603 10.49C10.0203 10.6 9.69034 10.18 9.68034 9.59999C9.67034 9.02999 9.68034 8.45999 9.68034 7.88999L9.67034 7.89999Z"
                                    fill="#E86B09"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_146_14">
                                    <rect width="21.1" height="48.66" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </section>

            {/* İçerik Bölümü */}
            <section
                id="works"
                className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-20"
            >
                <h2 className="font-dystopian text-3xl sm:text-4xl md:text-5xl mb-10 sm:mb-16 md:mb-20">
                    Works
                </h2>
                {/* İçerik buraya eklenecek */}
            </section>

            {/* Mobil Menü */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </div>
    );
}
