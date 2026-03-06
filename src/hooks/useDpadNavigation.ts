import { useEffect, useState } from 'react';

// Maps arrow keys to the closest element in that direction
export function useDpadNavigation() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
                return;
            }

            e.preventDefault();

            const currentFocus = document.activeElement as HTMLElement;

            if (e.key === 'Enter') {
                currentFocus?.click();
                return;
            }

            const focusables = Array.from(
                document.querySelectorAll<HTMLElement>('[data-focusable="true"]')
            );

            if (focusables.length === 0) return;

            if (!currentFocus || !focusables.includes(currentFocus)) {
                focusables[0].focus();
                return;
            }

            const rect = currentFocus.getBoundingClientRect();
            let bestMatch: HTMLElement | null = null;
            let minDistance = Infinity;

            focusables.forEach((el) => {
                if (el === currentFocus) return;

                const r = el.getBoundingClientRect();
                let distance = Infinity;

                // Basic spatial navigation heuristic
                if (e.key === 'ArrowRight' && r.left >= rect.right) {
                    distance = Math.pow(r.left - rect.right, 2) + Math.pow(r.top - rect.top, 2);
                } else if (e.key === 'ArrowLeft' && r.right <= rect.left) {
                    distance = Math.pow(rect.left - r.right, 2) + Math.pow(r.top - rect.top, 2);
                } else if (e.key === 'ArrowDown' && r.top >= rect.bottom) {
                    distance = Math.pow(r.top - rect.bottom, 2) + Math.pow(r.left - rect.left, 2);
                } else if (e.key === 'ArrowUp' && r.bottom <= rect.top) {
                    distance = Math.pow(rect.top - r.bottom, 2) + Math.pow(r.left - rect.left, 2);
                }

                if (distance < minDistance) {
                    minDistance = distance;
                    bestMatch = el;
                }
            });

            if (bestMatch) {
                (bestMatch as HTMLElement).focus();
                // Scroll the container to ensure the focused element is fully visible (critical for TV)
                (bestMatch as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
}
