'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [phase, setPhase] = useState(1);
    const [gridItems, setGridItems] = useState([]);

    useEffect(() => {
        const initialTexts = [
            "ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE",
            "AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI",
            "ARTIFICIAL INTELLIGENCE", "ADVANCEMENT", "AHMAD KAISS", "AHMAD KAISS", "ADVANCEMENT", "ARTIFICIAL INTELLIGENCE",
            "AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI",
            "ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"
        ];

        setGridItems(shuffleArray(initialTexts.map(text => ({ text, visible: true }))));

        const phase2Timeout = setTimeout(() => {
            setPhase(2);
        }, 3000);

        const completeTimeout = setTimeout(() => {
            setGridItems(prevItems => prevItems.map(item => ({ ...item, visible: false })));
        }, 6000);

        return () => {
            clearTimeout(phase2Timeout);
            clearTimeout(completeTimeout);
        };
    }, []);

    const shuffleArray = (array) => {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    return (
        <div className="preloader">
            <div className="grid">
                <AnimatePresence>
                    {gridItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="gridItem"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: item.visible ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                        >
                            <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [1, 0, 1], filter: ["blur(0px)", "blur(10px)", "blur(0px)"] }}
                                transition={{ duration: 0.3, repeat: phase === 2 ? 2 : 0 }}
                            >
                                {phase === 1 ? item.text : "WELCOME"}
                            </motion.span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Preloader;