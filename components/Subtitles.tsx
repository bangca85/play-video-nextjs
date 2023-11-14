'use client';
import React, { useEffect, useRef } from 'react';

interface Subtitle {
    start: number;
    end: number;
    text: string;
}

const Subtitles: React.FC<{ subtitles: Subtitle[]; currentTime: number }> = ({ subtitles, currentTime }) => {
    const currentSubtitleIndex = subtitles.findIndex(sub => currentTime >= sub.start && currentTime <= sub.end);
    const subtitleRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (subtitleRef.current[currentSubtitleIndex]) {
            subtitleRef.current[currentSubtitleIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentSubtitleIndex]);

    return (
        <div className="overflow-y-auto">
            {subtitles.map((sub, index) => (
                <div
                    key={index}
                    ref={el => {
                        if (el) subtitleRef.current[index] = el;
                    }}
                    className={`p-2 my-1 ${index === currentSubtitleIndex ? 'bg-slate-400' : ''}`}
                >
                        {formatTime(sub.start)}: {sub.text} {/* Only display start time */}
                </div>
            ))}
        </div>
    );
}

// Helper function to format time in HH:MM:SS format
const formatTime = (seconds: number): string => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
};

export default Subtitles;
