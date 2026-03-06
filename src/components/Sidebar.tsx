import React, { useState } from 'react';
import { Search, Home, Library, Headphones, Settings, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { icon: Search, label: '검색' },
        { icon: Home, label: '홈' },
        { icon: Library, label: '카테고리' },
        { icon: Headphones, label: '오디오북' },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-50 flex flex-col items-center py-16 transition-all duration-500 ease-out bg-black/60 dark:bg-black/40 backdrop-blur-2xl border-r border-white/10 ${isExpanded ? 'w-[320px] items-start px-12 shadow-2xl shadow-black/50' : 'w-[120px]'
                }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Brand / Profile */}
            <button
                data-focusable="true"
                className="mb-24 flex items-center gap-6 focus:tv-focus outline-none rounded-full p-2 group"
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-[2px]">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                </div>
                <span className={`text-2xl font-secondary font-bold whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 hidden'
                    }`}>
                    우리 가족
                </span>
            </button>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-8 w-full">
                {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            data-focusable="true"
                            className={`flex items-center gap-6 p-4 rounded-xl focus:tv-focus outline-none group text-white/60 dark:text-white/60 hover:text-white transition-colors w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
                        >
                            <Icon className="w-8 h-8 group-focus:text-white group-hover:text-white" />
                            <span className={`text-2xl font-secondary font-medium whitespace-nowrap transition-opacity duration-300 group-focus:text-white group-hover:text-white ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 hidden'
                                }`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Theme Toggle */}
            <button
                data-focusable="true"
                onClick={toggleTheme}
                className={`mt-auto mb-4 flex items-center gap-6 p-4 rounded-xl focus:tv-focus outline-none group text-white/60 hover:text-white transition-colors w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
            >
                {theme === 'dark' ? <Sun className="w-8 h-8 group-hover:text-white" /> : <Moon className="w-8 h-8 group-hover:text-white" />}
                <span className={`text-2xl font-secondary font-medium whitespace-nowrap transition-opacity duration-300 group-hover:text-white ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 hidden'
                    }`}>
                    {theme === 'dark' ? '라이트 모드' : '다크 모드'}
                </span>
            </button>

            {/* Settings */}
            <button
                data-focusable="true"
                className={`flex items-center gap-6 p-4 rounded-xl focus:tv-focus outline-none group text-white/60 hover:text-white transition-colors w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
            >
                <Settings className="w-8 h-8 group-hover:text-white" />
                <span className={`text-2xl font-secondary font-medium whitespace-nowrap transition-opacity duration-300 group-hover:text-white ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 hidden'
                    }`}>
                    설정
                </span>
            </button>

        </aside>
    );
}
