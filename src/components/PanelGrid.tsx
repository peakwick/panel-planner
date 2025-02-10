
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

          {/* Human figure reference */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="text-xs text-secondary mb-1">Reference: 165cm</div>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: humanHeightPixels,
                width: 'auto',
              }}
              viewBox="-240.16 106.44 1080 1080"
              className="opacity-70"
            >
              <g transform="matrix(1 0 0 1 313.08 432.98)">
                <path style={{
                  stroke: "none",
                  strokeWidth: 1,
                  fill: "rgb(47,46,65)",
                }} d="M 325.54487 370.51438 C 325.54487 370.51438 348.50723 375.43138 351.93536 373.14593 C 354.0315538087403 371.83068162670986 356.6954361912597 371.83068162670986 358.79163 373.14593 C 378.21773 365.71829 358.61392 343.06643 358.04257 333.92472000000004 C 357.47122 324.78301000000005 346.04408 312.21317000000005 346.04408 312.21317000000005 Z" />
              </g>
              <g transform="matrix(1 0 0 1 275.66 496.15)">
                <path style={{
                  stroke: "none",
                  strokeWidth: 1,
                  fill: "rgb(160,97,106)",
                }} d="M 304.72571 349.15094 C 304.72571 361.67938 279.66879 389.24194 279.66879 389.24194 L 327.27688 463.15978 C 327.27688 463.15978 346.06959 387.98908 334.79396 384.23056 C 323.51833000000005 380.47204000000005 336.0468 362.93221000000005 336.0468 362.93221000000005 Z" />
              </g>
              <g transform="matrix(1 0 0 1 283.24 664.05)">
                <path style={{
                  stroke: "none",
                  strokeWidth: 1,
                  fill: "rgb(47,46,65)",
                }} d="M 287.10313 380.47292 C 287.10313 380.47292 283.42743 385.48345 269.64613 389.24199 C 255.86483000000004 393.00052999999997 217.02662000000004 429.33299 215.77379000000002 455.64277 C 214.52096 481.95255 248.34779000000003 474.43543 248.34779000000003 474.43543 C 248.34779000000003 474.43543 279.66892 479.44680999999997 279.66892 480.69966 C 279.66892 481.95251 278.41609 489.46958 278.41609 489.46958 C 258.37054 514.52646 255.86488 557.12319 255.86488 557.12319 C 255.86488 557.12319 243.33642 743.79706 245.84213 758.83119 C 248.34784 773.86532 308.48438 765.0954 308.48438 765.0954 L 310.99 597.21421 C 310.99 597.21421 336.0468 747.55555 341.05822 760.084 C 346.06964 772.6124499999999 417.48177 756.3254599999999 417.48177 756.3254599999999 C 417.48177 756.3254599999999 358.59805 507.0093399999999 358.59805 490.72237999999993 C 358.59805 474.43541999999997 377.39072 470.6768799999999 377.39072 470.6768799999999 C 377.39072 470.6768799999999 397.43617 474.4353999999999 398.68905 466.91833999999994 C 399.94193 459.40128 407.45897 448.12566999999996 407.45897 448.12566999999996 C 407.45897 448.12566999999996 392.42485000000005 415.55166999999994 378.64355 398.01186999999993 C 364.86224999999996 380.4720699999999 334.794 384.23059 334.794 384.23059 L 318.507 440.60859 Z" />
              </g>
              <g transform="matrix(1 0 0 1 293.9 432.88)">
                <circle style={{
                  stroke: "none",
                  strokeWidth: 1,
                  fill: "rgb(160,97,106)",
                }} cx="0" cy="0" r="27.56258" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
