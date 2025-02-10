
import React from "react";
import { motion } from "framer-motion";

interface PanelGridProps {
  rows: number;
  columns: number;
  panelWidth: number;
  panelHeight: number;
  targetWidth: number;
  targetHeight: number;
}

export const PanelGrid: React.FC<PanelGridProps> = ({
  rows,
  columns,
  panelWidth,
  panelHeight,
  targetWidth,
  targetHeight,
}) => {
  const containerWidth = Math.min(800, window.innerWidth - 40);
  const containerHeight = 400;
  
  const scaleWidth = containerWidth / (columns * panelWidth);
  const scaleHeight = containerHeight / (rows * panelHeight);
  const scale = Math.min(scaleWidth, scaleHeight);

  const scaledPanelWidth = panelWidth * scale;
  const scaledPanelHeight = panelHeight * scale;

  const finalWidth = columns * panelWidth;
  const finalHeight = rows * panelHeight;
  const widthDiff = finalWidth - targetWidth;
  const heightDiff = finalHeight - targetHeight;

  // Fixed human height at 165cm, scaled to match panel scale
  const humanHeightCm = 165;
  const pixelsPerCm = scaledPanelHeight / panelHeight;
  const humanHeightPixels = humanHeightCm * pixelsPerCm;

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Width Label */}
      <div className="text-center mb-2 text-sm text-secondary">
        Width: {finalWidth}cm ({targetWidth}cm {widthDiff >= 0 ? "+" : ""}{widthDiff}cm)
      </div>
      
      <div className="flex">
        {/* Height Label */}
        <div className="writing-mode-vertical text-sm text-secondary mr-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Height: {finalHeight}cm ({targetHeight}cm {heightDiff >= 0 ? "+" : ""}{heightDiff}cm)
        </div>

        <div className="flex items-end gap-8">
          <div
            style={{
              width: columns * scaledPanelWidth,
              height: rows * scaledPanelHeight,
            }}
            className="relative border border-secondary"
          >
            {Array.from({ length: rows * columns }).map((_, index) => {
              const row = Math.floor(index / columns);
              const col = index % columns;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  style={{
                    width: scaledPanelWidth,
                    height: scaledPanelHeight,
                    top: row * scaledPanelHeight,
                    left: col * scaledPanelWidth,
                  }}
                  className="absolute border border-secondary/30 bg-secondary/5"
                />
              );
            })}
          </div>

          {/* Human figure with reference height */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="text-xs text-secondary mb-1">Reference: 165cm</div>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: humanHeightPixels,
                width: 'auto',
              }}
              viewBox="0 0 100 165"
              className="opacity-70"
            >
              <path
                d="M50 0
                   a15 15 0 0 1 0 30
                   a15 15 0 0 1 0 -30
                   M35 60
                   v40
                   l-20 40
                   M65 60
                   v40
                   l20 40
                   M50 30
                   v80
                   M35 110
                   h30"
                stroke="currentColor"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

