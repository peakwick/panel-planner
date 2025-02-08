
import React from "react";
import { motion } from "framer-motion";

interface PanelGridProps {
  rows: number;
  columns: number;
  panelWidth: number;
  panelHeight: number;
}

export const PanelGrid: React.FC<PanelGridProps> = ({
  rows,
  columns,
  panelWidth,
  panelHeight,
}) => {
  const containerWidth = Math.min(800, window.innerWidth - 40);
  const scale = containerWidth / (columns * panelWidth);
  const scaledPanelWidth = panelWidth * scale;
  const scaledPanelHeight = panelHeight * scale;

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-sm">
      <div
        style={{
          width: columns * scaledPanelWidth,
          height: rows * scaledPanelHeight,
        }}
        className="relative mx-auto border border-secondary"
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
  );
};
