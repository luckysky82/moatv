import React, { useState } from 'react';
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
        <>
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
        </>
    );
}

export default App;
