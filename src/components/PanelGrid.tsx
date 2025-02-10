
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
                width: 'auto'
              }}
              viewBox="0 0 802.704 751.589"
              className="opacity-70"
            >
              <g transform="translate(-591 -185.668)">
                <path d="M1025.138,691.957H224.566c-.589,0-1.066-.779-1.066-1.741s.477-1.741,1.066-1.741h800.572c.589,0,1.066.779,1.066,1.741S1025.726,691.957,1025.138,691.957Z" transform="translate(367.5 226.498)" fill="#cacaca"/>
                <ellipse cx="11.689" cy="11.689" rx="11.689" ry="11.689" transform="translate(687.22 666.759)" fill="#6c63ff"/>
                <ellipse cx="11.689" cy="11.689" rx="11.689" ry="11.689" transform="translate(738.472 750.083)" fill="#6c63ff"/>
                <ellipse cx="11.689" cy="11.689" rx="11.689" ry="11.689" transform="translate(698.909 738.689)" fill="#6c63ff"/>
                <path d="M613.505,191.765s-20.247-7.231-33.263,21.694S546.979,274.2,546.979,274.2l11.57,2.892s2.892-20.247,10.124-23.14l-2.892,26.032s74.41,30.371,113.458-2.892l4.339-10.362v10.362l10.124-4.577s-4.339-8.677-17.355-20.247a40.264,40.264,0,0,1-13.217-26.229,37.6,37.6,0,0,0-8.657-20.478C645.822,195.537,637.368,180.276,613.505,191.765Z" transform="translate(387.413 97.981)" fill="#090814"/>
                <path d="M593.774,311.075,572.8,284.861l-15.728-53.738L617.366,166.9s13.107-49.806,1.311-47.184-14.417,39.32-14.417,39.32l-76.02,58.981s7.864,82.573,30.146,111.408l17.039,53.738Z" transform="translate(385.788 92.078)" fill="#ffb9b9"/>
                <path d="M643.99,311.075l20.971-26.214,15.728-53.738L620.4,166.9s-13.107-49.806-1.311-47.184,14.417,39.32,14.417,39.32l76.02,58.981s-7.864,82.573-30.146,111.408l-17.039,53.738Z" transform="translate(393.242 92.078)" fill="#ffb9b9"/>
                <circle cx="31.436" cy="31.436" r="31.436" transform="translate(977.951 314.889)" fill="#ffb9b9"/>
                <path d="M601.646,260.815s1.311,27.524-6.553,36.7-15.728,56.359,22.282,57.67,34.078-39.32,34.078-39.32l-7.864-22.282s-11.8-17.039-7.864-32.767Z" transform="translate(391.023 104.328)" fill="#ffb9b9"/>
                <path d="M568.354,541.824l28.18,8.519s22.937-13.762,22.937-.655-7.864,30.146-5.243,41.942,7.864,40.631,0,40.631-23.592-51.117-23.592-51.117l-26.214-14.417Z" transform="translate(388.927 128.707)" fill="#ffb9b9"/>
                <path d="M601.766,710.671,591.28,751.3s-9.175,11.8,0,17.039c4.305,2.46,7.456,7.518,9.588,12.193a22.417,22.417,0,0,0,22.012,13.317c4.474-.371,8.242-2.14,9.159-6.736a10.547,10.547,0,0,0-2.03-8.26c-9.668-13.065-11.86-21.655-11.86-21.655l3.932-45.874Z" transform="translate(390.903 143.356)" fill="#ffb9b9"/>
                <path d="M566.965,451.278l-5.243,10.485S434.586,502.395,445.072,540.4s69.466,27.524,69.466,27.524l65.534,11.8,6.553-28.835-45.874-11.8,78.641-28.835,2.621,133.689-10.485,95.68,26.214,2.621s28.835-87.816,24.9-124.515c0,0,48.5-149.418,20.971-171.7S566.965,451.278,566.965,451.278Z" transform="translate(378.519 119.641)" fill="#090814"/>
                <path d="M622.053,313.59,601.6,288.874l-13.852,6.349L573.332,341.1s-11.8,22.282,2.621,45.874c0,0,2.621,15.728-1.311,19.66s-5.243,28.835-5.243,28.835l-17.039,32.767s96.99,17.039,125.825-6.553c0,0-15.131-55.784-5.956-72.823s10.485-43.16,0-54.956-21.568-42.609-21.568-42.609l-6.347-4.06Z" transform="translate(387.88 106.619)" fill="#6c63ff"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
