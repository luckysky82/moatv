import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Rewind, FastForward } from 'lucide-react';

interface PlayerScreenProps {
    imageSrc: string;
    onBack: () => void;
}

export function PlayerScreen({ imageSrc, onBack }: PlayerScreenProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeLineIdx, setActiveLineIdx] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Focus play button on mount
    useEffect(() => {
        const playBtn = document.getElementById('play-pause-btn');
        playBtn?.focus();
    }, []);

    // Magazine-style longer editorial text
    const essayLines = [
        "어스름한 새벽빛이 창틈으로 스며드는 시간, 세상은 아직 고요에 잠겨 있습니다.",
        "바쁘게 돌아가던 어제의 상념들은 밤새 가라앉고, 오롯이 나 자신과 마주할 수 있는 짧은 여백이 찾아옵니다.",
        "우리는 매일 수많은 정보와 타인의 시선 속에서 살아갑니다. 그 속에서 진정한 나의 목소리를 듣기란 쉽지 않은 일이죠.",
        "하지만 이렇게 차 한 잔을 우리며 피어오르는 온기에 손을 녹이는 아주 작고 사소한 행위만으로도, 우리는 다시 나에게로 돌아올 수 있습니다.",
        "창밖으로 느릿하게 밝아오는 하늘을 응시하며 아무것도 하지 않아도 괜찮은 이 순간.",
        "비로소 내면 깊은 곳에 숨어 있던 작은 목소리가 선명하게 들리기 시작합니다. 그것은 위로일 수도 있고, 새로운 다짐일 수도 있습니다.",
        "우리는 늘 무언가를 성취하기 위해 숨 가쁘게 달리고 있지만, 진정한 에너지는 잠시 멈춰 섰을 때 비로소 차오르는 법입니다.",
        "숨을 깊게 들이마시고, 천천히 내쉬세요. 당신의 몸과 마음 구석구석으로 맑은 공기가 퍼져나가는 것을 느껴보세요.",
        "오늘 하루도 남들의 속도에 맞추려 무리하지 말고, 오직 당신만의 고유한 템포로 걸어가길 진심으로 바랍니다.",
    ];

    // Auto-scroll simulation
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveLineIdx((prev) => {
                    if (prev < essayLines.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, 6000); // 6 seconds for longer reading pace
        }
        return () => clearInterval(interval);
    }, [isPlaying, essayLines.length]);

    // Handle smooth scrolling without shifting layout (container explicit scroll)
    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current.parentElement;
            const activeEl = scrollRef.current.children[activeLineIdx] as HTMLElement;
            if (activeEl && container) {
                // Calculate position to center the active element within the container
                const containerCenter = container.clientHeight / 2;
                const elementCenter = activeEl.offsetTop + (activeEl.clientHeight / 2);
                container.scrollTo({
                    top: elementCenter - containerCenter,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeLineIdx]);

    return (
        <div className="w-[1920px] h-[1080px] bg-black text-white overflow-hidden relative font-primary">
            {/* Dynamic Blurred Background (Apple Music Style / Ambient Object) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={imageSrc}
                    alt="Blurred Background"
                    className="w-full h-full object-cover opacity-60 scale-110 blur-[80px] saturate-150 animate-pulse origin-center transition-all duration-[20s] ease-in-out"
                    style={{ animationDuration: '15s' }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
                {/* Subtle animated gradient overlay for mood */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/10 mix-blend-overlay"></div>
            </div>

            <main className="absolute inset-0 z-10 flex flex-col p-16">
                {/* Top Header */}
                <header className="flex items-center justify-between mb-16">
                    <button
                        onClick={onBack}
                        data-focusable="true"
                        className="flex items-center gap-4 text-3xl font-bold focus:tv-focus outline-none p-4 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-10 h-10" />
                        목록으로
                    </button>
                </header>

                <div className="flex-1 flex gap-24 h-full">
                    {/* Left Column: Artwork and Controls */}
                    <section className="w-[500px] flex flex-col pt-12 shrink-0 pl-16">
                        {/* Massive Cover Art */}
                        <div className={`w-[340px] aspect-[1/1.4] mx-auto rounded-2xl shadow-2xl shadow-black/80 overflow-hidden mb-6 transition-transform duration-1000 bg-black/20 ${isPlaying ? 'scale-100 shadow-[0_0_80px_rgba(255,85,0,0.4)]' : 'scale-95'}`}>
                            <img src={imageSrc} alt="Magazine Cover" className="w-full h-full object-contain" />
                        </div>

                        {/* Metadata text and progress bar */}
                        <div className="w-full px-4">
                            <h2 className="text-4xl font-primary font-bold mb-2 line-clamp-1 drop-shadow-md">시작의 여백</h2>
                            <p className="text-xl text-gray-300 font-secondary mb-6 drop-shadow-md">모아진 에디토리얼</p>

                            {/* Progress Bar Mock */}
                            <div className="w-full mb-6">
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_white]"
                                        style={{ width: `${(activeLineIdx / (essayLines.length - 1)) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-lg text-gray-400 mt-3 font-secondary">
                                    <span>00:{String(activeLineIdx * 4).padStart(2, '0')}</span>
                                    <span>00:{String(essayLines.length * 4).padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Playback Controls (Fixed Layout) */}
                        <div className="flex items-center justify-center gap-6 px-4 w-full">
                            <button data-focusable="true" className="p-3 rounded-full focus:tv-focus outline-none text-white/50 hover:text-white transition-colors">
                                <Rewind className="w-8 h-8" />
                            </button>
                            <button data-focusable="true" className="p-3 rounded-full focus:tv-focus outline-none text-white/70 hover:text-white transition-colors">
                                <SkipBack className="w-10 h-10" />
                            </button>

                            {/* Main Play/Pause */}
                            <button
                                id="play-pause-btn"
                                onClick={() => setIsPlaying(!isPlaying)}
                                data-focusable="true"
                                className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-black focus:tv-focus outline-none hover:scale-105 transition-transform shadow-xl shrink-0"
                            >
                                {isPlaying ? <Pause className="w-10 h-10 fill-black" /> : <Play className="w-10 h-10 fill-black ml-1" />}
                            </button>

                            <button data-focusable="true" className="p-3 rounded-full focus:tv-focus outline-none text-white/70 hover:text-white transition-colors">
                                <SkipForward className="w-10 h-10" />
                            </button>
                            <button data-focusable="true" className="p-3 rounded-full focus:tv-focus outline-none text-white/50 hover:text-white transition-colors">
                                <FastForward className="w-8 h-8" />
                            </button>
                        </div>
                    </section>

                    {/* Right Column: "Lyrics" Style Scrolling Text */}
                    <section
                        className="flex-1 h-full pt-[60px] pb-[240px] overflow-y-auto no-scrollbar relative mask-image-vertical"
                        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
                    >
                        <div
                            ref={scrollRef}
                            className="flex flex-col gap-16 transition-transform duration-700 ease-out"
                        >
                            {essayLines.map((line, idx) => {
                                const isActive = idx === activeLineIdx;
                                const isPast = idx < activeLineIdx;
                                return (
                                    <p
                                        key={idx}
                                        className={`text-6xl font-secondary font-black leading-tight tracking-tight transition-all duration-700 ease-in-out cursor-pointer hover:text-white/80
                      ${isActive ? 'text-white opacity-100 transform scale-100 blur-none' :
                                                isPast ? 'text-white/40 opacity-40 blur-[1px] transform scale-[0.98]' :
                                                    'text-white/20 opacity-20 blur-[2px] transform scale-[0.95]'
                                            }
                    `}
                                        onClick={() => {
                                            setActiveLineIdx(idx);
                                            setIsPlaying(true);
                                        }}
                                    >
                                        {line}
                                    </p>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
