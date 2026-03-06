import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { PlayerScreen } from './components/PlayerScreen';
import { MagazineDetail } from './components/MagazineDetail';
import { useDpadNavigation } from './hooks/useDpadNavigation';

function App() {
    // Initialize global D-Pad navigation simulation for the TV prototype
    useDpadNavigation();

    // Application State
    const [currentScreen, setCurrentScreen] = useState<'home' | 'detail' | 'player'>('home');
    const [selectedMagazine, setSelectedMagazine] = useState<string | null>(null);
    const [scale, setScale] = useState(1);

    // Responsive scaling to fit window
    useEffect(() => {
        const handleResize = () => {
            const widthScale = window.innerWidth / 1920;
            const heightScale = window.innerHeight / 1080;
            setScale(Math.min(widthScale, heightScale));
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectMagazine = (imgSrc: string) => {
        setSelectedMagazine(imgSrc);
        setCurrentScreen('detail');
    };

    const handlePlayAudio = (imgSrc: string) => {
        setSelectedMagazine(imgSrc);
        setCurrentScreen('player');
    };

    const handleBackToHome = () => {
        setCurrentScreen('home');
        setSelectedMagazine(null);
    };

    const handleBackToDetail = () => {
        setCurrentScreen('detail');
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-black overflow-hidden relative">
            <div
                style={{
                    transform: `scale(${scale})`,
                    width: '1920px',
                    height: '1080px',
                    transformOrigin: 'center'
                }}
                className="relative shrink-0"
            >
                {currentScreen === 'home' && (
                    <HomeScreen onSelectMagazine={handleSelectMagazine} />
                )}
                {currentScreen === 'detail' && selectedMagazine && (
                    <MagazineDetail
                        imageSrc={selectedMagazine}
                        onBack={handleBackToHome}
                        onPlay={() => handlePlayAudio(selectedMagazine)}
                    />
                )}
                {currentScreen === 'player' && selectedMagazine && (
                    <PlayerScreen
                        imageSrc={selectedMagazine}
                        onBack={handleBackToDetail}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
