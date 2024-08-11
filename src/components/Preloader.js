'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete, isReady }) => {
    const [phase, setPhase] = useState(1);
    const [gridItems, setGridItems] = useState([]);

    useEffect(() => {
        const gridStructure = [
            ["ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"],
            ["AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI"],
            ["ARTIFICIAL INTELLIGENCE", "ADVANCEMENT", "AHMAD KAISS", "AHMAD KAISS", "ADVANCEMENT", "ARTIFICIAL INTELLIGENCE"],
            ["AI", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "AI"],
            ["ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"]
        ];

        const flattenedItems = gridStructure.flat().map((text, index) => ({
            text,
            visible: false,
            index
        }));

        setGridItems(flattenedItems);

        // Animate items in randomly
        const animationPromises = flattenedItems.map((item, index) => 
            new Promise(resolve => {
                setTimeout(() => {
                    setGridItems(prev => prev.map((prevItem, i) => 
                        i === index ? { ...prevItem, visible: true } : prevItem
                    ));
                    resolve();
                }, Math.random() * 2000);
            })
        );

        // When all items are visible and content is ready, move to phase 2
        Promise.all(animationPromises).then(() => {
            const checkReadyAndTransition = () => {
                if (isReady) {
                    setTimeout(() => {
                        setPhase(2);
                        setTimeout(onLoadingComplete, 2000); // Allow time for "WELCOME" animation
                    }, 1000);
                } else {
                    setTimeout(checkReadyAndTransition, 100); // Check again in 100ms
                }
            };
            checkReadyAndTransition();
        });

    }, [isReady, onLoadingComplete]);

    return (
        <motion.div 
            className="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="grid">
                <AnimatePresence>
                    {gridItems.map((item) => (
                        <motion.div
                            key={item.index}
                            className={`gridItem ${item.visible ? 'visible' : ''}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: item.visible ? 1 : 0, 
                                scale: item.visible ? 1 : 0.8,
                                borderColor: phase === 1 ? "white" : "transparent"
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ 
                                    opacity: phase === 2 ? [1, 0, 1] : 1, 
                                    filter: phase === 2 ? ["blur(0px)", "blur(10px)", "blur(0px)"] : "blur(0px)"
                                }}
                                transition={{ duration: 0.3, repeat: phase === 2 ? 2 : 0 }}
                            >
                                {phase === 1 ? item.text : "WELCOME"}
                            </motion.span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Preloader;