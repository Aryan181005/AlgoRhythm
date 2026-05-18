import React from "react";

const AppLogo = ({size}) => {
  return (
    <>
      <svg
        className="w-full h-auto"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background --> */}
        <rect width="800" height="800" />

        {/* <!-- Gradient Definition --> */}
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00D1FF" />
            <stop offset="50%" stop-color="#6C63FF" />
            <stop offset="100%" stop-color="#A855F7" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* <!-- Main "N" Shape --> */}
        <path
          d="M200 600 L200 200 L320 200 L480 480 L480 200 L600 200 L600 600 L480 600 L320 320 L320 600 Z"
          fill="url(#grad)"
          filter="url(#glow)"
        />

        {/* <!-- Pixel Trail (right side) --> */}
        <rect x="620" y="220" width="18" height="18" fill="#A855F7" />
        <rect x="650" y="250" width="16" height="16" fill="#8B5CF6" />
        <rect x="675" y="280" width="14" height="14" fill="#7C3AED" />
        <rect x="700" y="310" width="12" height="12" fill="#6D28D9" />

        {/* <!-- Chart Bars (bottom left) --> */}
        <rect x="200" y="520" width="20" height="80" fill="#00D1FF" />
        <rect x="230" y="480" width="20" height="120" fill="#38BDF8" />
        <rect x="260" y="540" width="20" height="60" fill="#60A5FA" />

        {/* <!-- Node Graph Line --> */}
        <path
          d="M320 550 L360 520 L400 540 L440 500"
          stroke="url(#grad)"
          stroke-width="4"
        />

        <circle cx="320" cy="550" r="6" fill="#00D1FF" />
        <circle cx="360" cy="520" r="6" fill="#6C63FF" />
        <circle cx="400" cy="540" r="6" fill="#A855F7" />
        <circle cx="440" cy="500" r="6" fill="#00D1FF" />

        {/* <!-- Text --> */}
        <text
          x="400"
          y="720"
          text-anchor="middle"
          font-size="64"
          font-family="Arial, sans-serif"
          fill="url(#grad)"
          letter-spacing="6"
        >
          NEXALGO
        </text>

        {/* <!-- Tagline --> */}
        <text
          x="400"
          y="760"
          text-anchor="middle"
          font-size="18"
          font-family="Arial, sans-serif"
          fill="#9CA3AF"
          letter-spacing="4"
        >
          VISUALIZE • LEARN • MASTER
        </text>
      </svg>
    </>
  );
};

export default AppLogo;
