import React, { useEffect } from "react";
import AppRoutes from "../routes.jsx";

const Layout = () => {
    
    // Starfield generation effect
    useEffect(() => {
        const starContainer = document.getElementById('star-bg');
        if (!starContainer) return;
        
        // Clear existing stars if any
        starContainer.innerHTML = '';

        for (let i = 0; i < 100; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            const size = `${Math.random() * 2 + 1}px`;
            star.style.width = size;
            star.style.height = size;
            star.style.animationDuration = `${Math.random() * 30 + 20}s`; // 20-50 seconds
            star.style.animationDelay = `${Math.random() * 10}s`;
            starContainer.appendChild(star);
        }
    }, []);


    return (
        <div className="relative min-h-screen">
            <div id="star-bg"></div>
            <AppRoutes />
        </div>
    );
};

export default Layout;