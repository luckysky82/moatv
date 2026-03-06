import React, { useEffect } from 'react';
import { Play, ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MagazineDetailProps {
    imageSrc: string;
    onBack: () => void;
    onPlay: (imgSrc: string) => void;
}

export function MagazineDetail({ imageSrc, onBack, onPlay }: MagazineDetailProps) {
    useEffect(() => {
        document.getElementById('play-btn')?.focus();
    }, []);

    // Past Cosmopolitan issues provided by user
    const pastIssues = [
        '/img/스크린샷 2026-03-06 오후 3.21.55.png',
        '/img/스크린샷 2026-03-06 오후 3.22.01.png',
        '/img/스크린샷 2026-03-06 오후 3.22.08.png',
        '/img/스크린샷 2026-03-06 오후 3.22.15.png',
        '/img/스크린샷 2026-03-06 오후 3.22.22.png',
        '/img/스크린샷 2026-03-06 오후 3.22.28.png',
        '/img/스크린샷 2026-03-06 오후 3.22.34.png',
    ];

    return (
        <div className="w-[1920px] h-[1080px] bg-white dark:bg-[#050508] text-black dark:text-textPrimary overflow-hidden relative font-primary transition-colors duration-500">
            <Sidebar />

            <main className="absolute inset-0 pl-[120px] overflow-y-auto overflow-x-hidden no-scrollbar pb-32">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    data-focusable="true"
                    className="absolute top-16 left-[160px] z-20 flex items-center gap-4 text-3xl font-bold focus:tv-focus outline-none p-4 rounded-xl hover:bg-black/10 dark:hover:bg-white/10"
                >
                    <ArrowLeft className="w-10 h-10" />
                    뒤로
                </button>

                {/* Hero Section */}
                <section className="relative h-[650px] w-full flex items-end pb-16 px-16 shrink-0 mt-[120px]">
                    <div className="flex gap-24 items-end max-w-[1400px]">
                        {/* Cover Image */}
                        <div className="w-[400px] shrink-0 shadow-2xl rounded-xl overflow-hidden bg-black/10 dark:bg-black/50">
                            <img src={imageSrc} alt="Selected Magazine" className="w-full h-auto object-contain" />
                        </div>

                        {/* Details & Actions */}
                        <div className="mb-8">
                            <h1 className="text-7xl font-primary font-black mb-6">이번 달을 장식한 프리미엄 스토리</h1>
                            <p className="text-[28px] font-secondary text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                                모아진 에디터가 엄선한 이번 달 최고의 에세이와 기사들을 오디오북으로 만나보세요.
                                바쁜 일상 속에서도 당신의 영감을 채워줄 깊이 있는 이야기들이 준비되어 있습니다.
                            </p>

                            <button
                                id="play-btn"
                                data-focusable="true"
                                onClick={() => onPlay(imageSrc)}
                                className="flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-full text-4xl font-bold focus:tv-focus outline-none transition-transform hover:scale-105 shadow-xl shadow-primary/30"
                            >
                                <Play className="w-10 h-10 fill-white" />
                                듣기
                            </button>
                        </div>
                    </div>
                </section>

                {/* Past Issues (지난 권호) */}
                <section className="mt-16 px-16">
                    <h3 className="text-4xl font-primary font-bold mb-8 dark:text-white/90">지난 권호</h3>
                    <div className="flex gap-8 pb-8 overflow-x-auto no-scrollbar">
                        {pastIssues.map((imgSrc, idx) => (
                            <button
                                key={idx}
                                data-focusable="true"
                                className="relative shrink-0 w-[300px] aspect-[1/1.4] rounded-card bg-gray-200 dark:bg-cardHover focus:tv-focus outline-none transition-transform duration-300 group overflow-hidden shadow-xl"
                            >
                                <img
                                    src={imgSrc}
                                    alt={`Past Issue ${idx}`}
                                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-focus:scale-110 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-focus:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white text-2xl font-bold">{idx + 1}월호</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
