
import React, { useState, useEffect } from "react";
import { DimensionInput } from "@/components/DimensionInput";
import { PanelGrid } from "@/components/PanelGrid";
import { ResultCard } from "@/components/ResultCard";
import { motion } from "framer-motion";

const Index = () => {
  const [targetWidth, setTargetWidth] = useState<number>(1000);
  const [targetHeight, setTargetHeight] = useState<number>(1000);
  const [panelWidth, setPanelWidth] = useState<number>(500);
  const [panelHeight, setPanelHeight] = useState<number>(500);

  const [results, setResults] = useState({
    panels: { rows: 0, columns: 0, total: 0 },
    dimensions: { width: 0, height: 0 },
    excess: { width: 0, height: 0 },
  });

  useEffect(() => {
    const columns = Math.ceil(targetWidth / panelWidth);
    const rows = Math.ceil(targetHeight / panelHeight);
    const totalPanels = columns * rows;
    const finalWidth = columns * panelWidth;
    const finalHeight = rows * panelHeight;
    const excessWidth = finalWidth - targetWidth;
    const excessHeight = finalHeight - targetHeight;

    setResults({
      panels: { rows, columns, total: totalPanels },
      dimensions: { width: finalWidth, height: finalHeight },
      excess: { width: excessWidth, height: excessHeight },
    });
  }, [targetWidth, targetHeight, panelWidth, panelHeight]);

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

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ResultCard
                title="Total Panels Needed"
                value={results.panels.total}
                description={`${results.panels.columns} × ${results.panels.rows} grid`}
                variant="default"
              />
              <ResultCard
                title="Final Dimensions"
                value={`${results.dimensions.width} × ${results.dimensions.height}`}
                description="mm"
                variant="success"
              />
            </div>

            {(results.excess.width > 0 || results.excess.height > 0) && (
              <ResultCard
                title="Excess Space"
                value={`${results.excess.width} × ${results.excess.height}`}
                description="mm over target size"
                variant="warning"
              />
            )}

            <PanelGrid
              rows={results.panels.rows}
              columns={results.panels.columns}
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
