import React, { useEffect, useRef } from 'react';
import { Play, Info } from 'lucide-react';
import { magazineImages } from '../data/magazines';
import { Sidebar } from './Sidebar';

interface HomeScreenProps {
    onSelectMagazine: (imgSrc: string) => void;
}

export function HomeScreen({ onSelectMagazine }: HomeScreenProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Focus the main hero play button on mount
    useEffect(() => {
        const playBtn = document.getElementById('hero-play-btn');
        playBtn?.focus();

        // Setup Intersection Observer for scroll animations
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-24');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    // Optional: Unobserve after first animation if you only want it to happen once
                    // observerRef.current?.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        const elements = document.querySelectorAll('.scroll-animate-section');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, []);

    // Simple categorization helper to slice the images array for swimlanes
    const rows = [
        { title: "이번 주 인기 매거진", images: magazineImages.slice(0, 8), id: 'row1' },
        { title: "패션 & 트렌드 미리보기", images: magazineImages.slice(8, 16), id: 'row2' },
        { title: "프리미엄 공간과 리빙", images: magazineImages.slice(16, 24), id: 'row3' },
        { title: "에디터 추천 픽", images: magazineImages.slice(24), id: 'row4' },
    ];

    return (
        <div className="w-[1920px] h-[1080px] bg-white dark:bg-[#050508] text-black dark:text-textPrimary overflow-hidden relative font-primary transition-colors duration-500">
            <Sidebar />

            {/* Main Content Area (Scrollable) */}
            <main className="absolute inset-0 pl-[120px] overflow-y-auto overflow-x-hidden no-scrollbar pb-32">
                {/* Dynamic Hero Section */}
                <section className="relative h-[800px] w-full flex items-end pb-32 px-16 shrink-0 scroll-animate-section opacity-0 translate-y-24 transition-all duration-[1200ms] ease-out">
                    {/* Blurred / Generated Background */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img
                            src="/moatv/img/cover_32.png"
                            alt="Hero Background"
                            className="w-full h-full object-cover opacity-80 animate-slow-pan origin-center"
                        />
                        {/* Vignette Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#050508] via-transparent to-transparent opacity-90 transition-colors duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050508] via-white/40 dark:via-[#050508]/40 to-transparent transition-colors duration-500"></div>
                    </div>

                    <div className="relative z-10 max-w-[900px]">
                        {/* Moazin BRAND / Magazine logo treatment */}
                        <h1 className="text-6xl font-primary font-bold text-primary tracking-widest mb-6 drop-shadow-xl">모아진 TV</h1>
                        <h2 className="text-[80px] font-primary font-black mb-6 leading-[1.1] text-black dark:text-white drop-shadow-2xl transition-colors duration-500">
                            깊은 사유의 시간,<br />월간 매거진
                        </h2>
                        <p className="text-[32px] font-secondary text-gray-700 dark:text-gray-300 mb-12 leading-relaxed drop-shadow-lg max-w-3xl transition-colors duration-500">
                            복잡한 현실을 떠나 오롯이 나에게 집중하는 시간. 최고 품질의 AI 보이스가 들려주는 이달의 프리미엄 에세이 모음.
                        </p>

                        <div className="flex items-center gap-6">
                            <button
                                id="hero-play-btn"
                                data-focusable="true"
                                onClick={() => onSelectMagazine(magazineImages[0])}
                                className="flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full text-3xl font-bold focus:tv-focus outline-none transition-transform hover:scale-105 shadow-xl shadow-primary/30"
                            >
                                <Play className="w-10 h-10 fill-white" />
                                추천작 상세
                            </button>
                        </div>
                    </div>
                </section>

                {/* Swimlane Rows */}
                <div className="relative z-20 flex flex-col gap-16 -mt-16">
                    {rows.map((row, index) => (
                        <section key={row.id} className="scroll-animate-section opacity-0 translate-y-24 transition-all duration-1000 ease-out" style={{ transitionDelay: `${index * 100}ms` }}>
                            <h3 className="text-4xl font-primary font-bold mb-8 px-16 text-black/90 dark:text-white/90 drop-shadow-md transition-colors duration-500">{row.title}</h3>

                            {/* Horizontal Scroll Area */}
                            <div id={row.id} className="flex gap-8 px-16 pb-8 overflow-x-auto no-scrollbar scroll-smooth">
                                {row.images.map((imgSrc, idx) => (
                                    <button
                                        key={`${row.id}-${idx}`}
                                        data-focusable="true"
                                        className="relative shrink-0 w-[400px] aspect-[1/1.4] rounded-card bg-gray-200 dark:bg-cardHover focus:tv-focus outline-none transition-transform duration-300 group overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/40"
                                        onClick={() => onSelectMagazine(imgSrc)}
                                    >
                                        <img
                                            src={imgSrc}
                                            alt={`Magazine Cover ${idx}`}
                                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-focus:scale-110 group-hover:scale-110"
                                        />
                                        {/* Hover/Focus Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-focus:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </main>
        </div>
    );
}
