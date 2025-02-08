
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
      </div>
    </div>
  );
};
