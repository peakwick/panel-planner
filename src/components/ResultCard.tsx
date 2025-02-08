
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultCardProps {
  title: string;
  value: string | number;
  description?: string;
  variant?: "default" | "success" | "warning";
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  description,
  variant = "default",
}) => {
  const variants = {
    default: "bg-white",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${variants[variant]} backdrop-blur-sm`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-secondary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="mt-1 text-sm text-secondary">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
