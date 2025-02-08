
import React, { useState, useEffect } from "react";
import { DimensionInput } from "@/components/DimensionInput";
import { PanelGrid } from "@/components/PanelGrid";
import { ResultCard } from "@/components/ResultCard";
import { motion } from "framer-motion";

const Index = () => {
  const [targetWidth, setTargetWidth] = useState<number>(100);
  const [targetHeight, setTargetHeight] = useState<number>(100);
  const [panelWidth, setPanelWidth] = useState<number>(50);
  const [panelHeight, setPanelHeight] = useState<number>(50);
  const [selectedOption, setSelectedOption] = useState<"minimum" | "maximum">("minimum");

  const [results, setResults] = useState({
    minimum: {
      panels: { rows: 0, columns: 0, total: 0 },
      dimensions: { width: 0, height: 0 },
      coverage: { width: 0, height: 0 },
    },
    maximum: {
      panels: { rows: 0, columns: 0, total: 0 },
      dimensions: { width: 0, height: 0 },
      excess: { width: 0, height: 0 },
    },
  });

  useEffect(() => {
    // Minimum coverage (might leave gaps)
    const minColumns = Math.floor(targetWidth / panelWidth);
    const minRows = Math.floor(targetHeight / panelHeight);
    const minTotalPanels = minColumns * minRows;
    const minFinalWidth = minColumns * panelWidth;
    const minFinalHeight = minRows * panelHeight;
    const minCoverageWidth = targetWidth - minFinalWidth;
    const minCoverageHeight = targetHeight - minFinalHeight;

    // Maximum coverage (might exceed)
    const maxColumns = Math.ceil(targetWidth / panelWidth);
    const maxRows = Math.ceil(targetHeight / panelHeight);
    const maxTotalPanels = maxColumns * maxRows;
    const maxFinalWidth = maxColumns * panelWidth;
    const maxFinalHeight = maxRows * panelHeight;
    const excessWidth = maxFinalWidth - targetWidth;
    const excessHeight = maxFinalHeight - targetHeight;

    setResults({
      minimum: {
        panels: { rows: minRows, columns: minColumns, total: minTotalPanels },
        dimensions: { width: minFinalWidth, height: minFinalHeight },
        coverage: { width: minCoverageWidth, height: minCoverageHeight },
      },
      maximum: {
        panels: { rows: maxRows, columns: maxColumns, total: maxTotalPanels },
        dimensions: { width: maxFinalWidth, height: maxFinalHeight },
        excess: { width: excessWidth, height: excessHeight },
      },
    });
  }, [targetWidth, targetHeight, panelWidth, panelHeight]);

  const currentResult = results[selectedOption];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-2">
            LED Panel Calculator
          </h1>
          <p className="text-secondary mb-8">
            Calculate the optimal panel layout for your target dimensions
          </p>
        </motion.div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Target Dimensions
              </h2>
              <DimensionInput
                label="Width"
                value={targetWidth}
                onChange={setTargetWidth}
              />
              <DimensionInput
                label="Height"
                value={targetHeight}
                onChange={setTargetHeight}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Panel Size
              </h2>
              <DimensionInput
                label="Panel Width"
                value={panelWidth}
                onChange={setPanelWidth}
              />
              <DimensionInput
                label="Panel Height"
                value={panelHeight}
                onChange={setPanelHeight}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ResultCard
                title="Minimum Coverage"
                value={`${results.minimum.panels.total} panels`}
                description={`${results.minimum.coverage.width.toFixed(1)} × ${results.minimum.coverage.height.toFixed(1)} cm uncovered`}
                variant={selectedOption === "minimum" ? "success" : "default"}
                onClick={() => setSelectedOption("minimum")}
              />
              <ResultCard
                title="Maximum Coverage"
                value={`${results.maximum.panels.total} panels`}
                description={`${results.maximum.excess.width.toFixed(1)} × ${results.maximum.excess.height.toFixed(1)} cm excess`}
                variant={selectedOption === "maximum" ? "success" : "default"}
                onClick={() => setSelectedOption("maximum")}
              />
            </div>

            <ResultCard
              title="Final Dimensions"
              value={`${currentResult.dimensions.width} × ${currentResult.dimensions.height}`}
              description="cm"
              variant="warning"
            />

            <PanelGrid
              rows={currentResult.panels.rows}
              columns={currentResult.panels.columns}
              panelWidth={panelWidth}
              panelHeight={panelHeight}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
