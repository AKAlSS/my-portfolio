'use client'

import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [gridTexts, setGridTexts] = useState([]);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const initialTexts = [
            "ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE",
            "AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI",
            "ARTIFICIAL INTELLIGENCE", "ADVANCEMENT", "AHMAD KAISS", "AHMAD KAISS", "ADVANCEMENT", "ARTIFICIAL INTELLIGENCE",
            "AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI",
            "ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"
        ];

        // Shuffle and set the grid texts randomly
        setGridTexts(shuffleArray(initialTexts));

        // Set a timeout to transition to the "WELCOME" phase
        const welcomeTimeout = setTimeout(() => {
            setLoadingComplete(true);
            setGridTexts(Array(30).fill("WELCOME"));
        }, 3000); // Adjust timing as needed

        return () => clearTimeout(welcomeTimeout);
    }, []);

    // Shuffle function for random appearance
    const shuffleArray = (array) => {
        let shuffledArray = array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        return shuffledArray;
    };

    return (
        <div className="preloader">
            <div className="grid">
                {gridTexts.map((text, index) => (
                    <div key={index} className={`gridItem ${loadingComplete ? 'fadeOut' : ''}`}>
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Preloader;
