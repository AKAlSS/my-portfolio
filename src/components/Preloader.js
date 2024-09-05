'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
    const [phase, setPhase] = useState(1);
    const [gridItems, setGridItems] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const mobileGridStructure = [
            ["ARTIFICIAL", "AHMAD", "ARTIFICIAL"],
            ["INTELLIGENCE", "KAISS", "INTELLIGENCE"],
            ["UX DESIGN", "AHMAD", "UX DESIGN"],
            ["ARTIFICIAL", "KAISS", "ARTIFICIAL"],
            ["INTELLIGENCE", "AHMAD", "INTELLIGENCE"],
            ["UX DESIGN", "KAISS", "UX DESIGN"],
            ["ARTIFICIAL", "AHMAD", "ARTIFICIAL"],
            ["INTELLIGENCE", "KAISS", "INTELLIGENCE"],
            ["UX DESIGN", "AHMAD", "UX DESIGN"],
            ["ARTIFICIAL", "KAISS", "ARTIFICIAL"]
        ];

        const desktopGridStructure = [
            ["ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"],
            ["UX/UI DESIGN", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "UX/UI DESIGN"],
            ["ARTIFICIAL INTELLIGENCE", "ADVANCEMENT", "AHMAD KAISS", "AHMAD KAISS", "ADVANCEMENT", "ARTIFICIAL INTELLIGENCE"],
            ["UX/UI DESIGN", "GROWTH", "AHMAD KAISS", "AHMAD KAISS", "GROWTH", "UX/UI DESIGN"],
            ["ARTIFICIAL INTELLIGENCE", "INNOVATION", "AHMAD KAISS", "AHMAD KAISS", "INNOVATION", "ARTIFICIAL INTELLIGENCE"]
        ];

        const gridStructure = isMobile ? mobileGridStructure : desktopGridStructure;
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

        // When all items are visible, move to phase 2
        Promise.all(animationPromises).then(() => {
            setTimeout(() => {
                setPhase(2);
            }, 1000);
        });

        // Simulate page load completion
        setTimeout(() => {
            onLoadingComplete();
        }, 5000); // Adjust this time based on your actual page load time

        return () => window.removeEventListener('resize', checkMobile);
    }, [onLoadingComplete, isMobile]);  // Added isMobile to the dependency array

    return (
        <motion.div 
            className="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className={`grid ${isMobile ? 'mobile' : ''}`}>
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