
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

  // Assuming average human height is 170cm
  const humanHeight = 170;
  const humanScale = (scaledPanelHeight * rows) / humanHeight * 0.8; // Scale human to 80% of panel height

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

        <div className="flex items-center gap-8">
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

          {/* Human figure */}
          <div className="flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{
                height: humanScale * 170,
                width: 'auto',
              }}
              viewBox="0 0 840.5 735.95293" 
              className="opacity-70"
            >
              <rect y="728.49218" width="840.5" height="2" fill="#3f3d56"/>
              <path d="M977.78688,333.21663v193.18h-502.38v-193.18a249.99082,249.99082,0,0,1,50.23-150.72,251.155,251.155,0,0,1,186.46-100.06q7.185-.42,14.5-.41c2.77,0,5.54.04,8.28.14a250.35447,250.35447,0,0,1,169.33,73.43c1.36,1.36,2.69,2.73,4.03,4.11a253.05329,253.05329,0,0,1,19.32,22.79A250.05555,250.05555,0,0,1,977.78688,333.21663Z" transform="translate(-179.75 -82.02353)" fill="#e6e6e6"/>
              <path d="M734.88051,82.16857v444.226H712.09225V82.43783q7.19385-.41945,14.50162-.4143C729.36989,82.02353,732.13554,82.065,734.88051,82.16857Z" transform="translate(-179.75 -82.02353)" fill="#fff"/>
              <path d="M927.55526,182.499H525.63249a251.94447,251.94447,0,0,1,19.31825-22.78826H908.237A251.94447,251.94447,0,0,1,927.55526,182.499Z" transform="translate(-179.75 -82.02353)" fill="#fff"/>
              <rect x="581.74684" y="165.73314" width="178.04999" height="278.64001" fill="#fff"/>
              <rect x="612.79288" y="216.65602" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="656.18358" y="216.65602" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="699.57428" y="216.65602" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="613.54099" y="278.00149" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="656.93169" y="278.00149" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="700.3224" y="278.00149" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="614.28911" y="339.34697" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="657.67981" y="339.34697" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="701.07051" y="339.34697" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="615.03722" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="658.42793" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="701.81863" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="615.03722" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="658.42793" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <rect x="701.81863" y="400.69244" width="26.93216" height="26.93216" fill="#e6e6e6"/>
              <circle cx="355.37197" cy="345.96177" r="37.11924" fill="#6c63ff"/>
              <polygon points="357.287 444.373 353.667 444.373 354.797 383.073 355.477 345.963 355.577 345.963 356.227 383.073 356.587 404.183 356.627 406.233 357.287 444.373" fill="#fff"/>
              <rect x="537.56939" y="482.6444" width="1.83557" height="6.93436" transform="translate(538.01779 -298.85673) rotate(62.23413)" fill="#fff"/>
              <circle cx="464.50174" cy="291.16612" r="56.44638" fill="#6c63ff"/>
              <polygon points="467.487 444.373 461.837 444.373 463.007 380.763 463.617 347.603 464.657 291.163 464.817 291.163 465.797 347.593 466.357 379.703 466.417 382.823 467.487 444.373" fill="#fff"/>
              <rect x="647.97348" y="456.30851" width="2.7913" height="10.54493" transform="translate(575.5382 -410.07438) rotate(62.23413)" fill="#fff"/>
              <path d="M527.82874,319.29022l9.53553-7.6266c-7.40773-.81727-10.45142,3.22275-11.69709,6.42045-5.78722-2.40307-12.0873.74628-12.0873.74628l19.07884,6.92629A14.43742,14.43742,0,0,0,527.82874,319.29022Z" transform="translate(-179.75 -82.02353)" fill="#6c63ff"/>
              <path d="M628.30425,257.14042l9.53553-7.6266c-7.40773-.81727-10.45142,3.22275-11.69709,6.42045-5.78722-2.40307-12.08729.74628-12.08729.74628l19.07883,6.92629A14.43742,14.43742,0,0,0,628.30425,257.14042Z" transform="translate(-179.75 -82.02353)" fill="#6c63ff"/>
              <path d="M589.97854,316.18273l9.53553-7.6266c-7.40773-.81727-10.45142,3.22275-11.69709,6.42045-5.78722-2.40307-12.08729.74628-12.08729.74628l19.07883,6.92629A14.43742,14.43742,0,0,0,589.97854,316.18273Z" transform="translate(-179.75 -82.02353)" fill="#6c63ff"/>
              <path d="M325.54487,370.51438s22.96236,4.917,26.39049,2.63155a6.45007,6.45007,0,0,1,6.85627,0c19.4261-7.42764-.17771-30.0795-.74906-39.22121s-11.99849-21.71155-11.99849-21.71155Z" transform="translate(-179.75 -82.02353)" fill="#2f2e41"/>
              <path d="M304.72571,349.15094c0,12.52844-25.05692,40.091-25.05692,40.091l47.60809,73.91784s18.79271-75.1707,7.51708-78.92922,1.25284-21.29835,1.25284-21.29835Z" transform="translate(-179.75 -82.02353)" fill="#a0616a"/>
              <path d="M249.60059,473.18258l33.82679,21.29835-8.76992,13.7813s-7.51708-6.26419-7.51708-7.51707-50.1138-25.05694-55.12517-28.81546,11.27558-20.0455,11.27558-20.0455Z" transform="translate(-179.75 -82.02353)" fill="#a0616a"/>
              <path d="M384.46168,471.51334s-33.38067,21.71476-34.6335,24.22045,8.76992,31.3211,15.17718,30.21965-.14305-21.44973-.14305-21.44973,30.06825-23.804,40.091-32.574-2.50571-28.81547-2.50571-28.81547Z" transform="translate(-179.75 -82.02353)" fill="#a0616a"/>
              <polygon points="217.932 674.792 225.493 702.224 243.47 701.475 234.218 667.276 217.932 674.792" fill="#a0616a"/>
              <polygon points="106.183 669.291 112.447 696.853 124.976 696.853 124.976 669.291 106.183 669.291" fill="#a0616a"/>
              <circle cx="147.5269" cy="260.86319" r="27.56258" fill="#a0616a"/>
              <path d="M287.10313,380.47292s-3.6757,5.01053-17.457,8.76907-52.61951,40.091-53.87234,66.40078,32.574,18.79266,32.574,18.79266,31.32113,5.01138,31.32113,6.26423-1.25283,8.76992-1.25283,8.76992c-20.04555,25.05688-22.55121,67.65361-22.55121,67.65361s-12.52846,186.67387-10.02275,201.708,62.64225,6.26421,62.64225,6.26421L310.99,597.21421S336.0468,747.55555,341.05822,760.084s76.42355-3.75854,76.42355-3.75854-58.88372-249.31612-58.88372-265.60308,18.79267-20.0455,18.79267-20.0455,20.04545,3.75852,21.29833-3.75854,8.76992-18.79267,8.76992-18.79267-15.03412-32.574-28.81542-50.1138S334.794,384.23059,334.794,384.23059l-16.287,56.378Z" transform="translate(-179.75 -82.02353)" fill="#2f2e41"/>
              <path d="M402.43429,775.84068s-2.58448,27.87708-2.50566,31.83816c.07036,3.535,25.07018,4.50756,27.57586.74906s11.27561,0,11.27561,2.50571,25.05687.7358,25.05687.7358c32.574-15.03417-4.66249-19.182-4.66249-19.182s-22.1867-10.47353-32.20945-14.23208-5.99245-1.49811-5.99245-1.49811C418.46687,785.52717,402.43429,775.84068,402.43429,775.84068Z" transform="translate(-179.75 -82.02353)" fill="#2f2e41"/>
              <path d="M282.1745,802.68072c-1.25283,1.25284,2.50567,17.53979,20.0455,15.03413s12.52846-21.29833,12.52846-23.804-2.50571-21.29838-3.75854-26.30976-22.55121,3.75855-22.55121,3.75855S283.42734,801.42789,282.1745,802.68072Z" transform="translate(-179.75 -82.02353)" fill="#2f2e41"/>
              <path d="M349.44282,317.35541A93.12641,93.12641,0,0,0,346.586,329.3539c-.57135,4.57085-11.42714,5.71356-11.42714,5.71356,1.1427,0,1.1427-6.85628,1.1427-6.85628,0,3.9995-6.28492,7.999-6.28492,7.999A67.492,67.492,0,0,0,314.59005,348.78c-7.999,8.57031,2.28544,9.713,2.28544,9.713-.77087,13.77352-28.96826,19.35638-28.96826,19.35638-32.56729-11.42711-7.75734-50.52627-7.75734-50.52627,24.56833-45.70851,44.43895-25.68008,44.43895-25.68008C346.01468,298.5006,349.44282,317.35541,349.44282,317.35541Z" transform="translate(-179.75 -82.02353)" fill="#2f2e41"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
