import React from "react";
import { motion } from "framer-motion";

interface CaloriesRingChartProps {
  calories: number;
  caloriesGoal: number;
  strokeWidth?: number;
}

const CaloriesRingChart: React.FC<CaloriesRingChartProps> = ({
  calories,
  caloriesGoal,
  strokeWidth = 30,
}) => {
  const size = 260;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(calories / caloriesGoal, 1);
  const offset = circumference * (1 - progress);
  const percentage = Math.round(progress * 100);

  return (
    <div className="relative w-full max-w-[260px] aspect-square mx-auto">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <motion.circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF6F00" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[26px] font-semibold text-black leading-tight">
          {Math.round(calories)} kcal
        </div>
        <div className="text-[14px] text-gray-500">
          Obiettivo: {Math.round(caloriesGoal)} kcal
        </div>
        <div className="mt-1 text-[13px] text-[#FF9500] font-medium">
          {percentage}% completato
        </div>
      </div>
    </div>
  );
};

export default CaloriesRingChart;
