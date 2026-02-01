"use client";

import { useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from "chart.js";
import styles from "./SpinWheel.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SpinWheelProps {
  names: string[];
  onResult: (name: string) => void;
  levelUpMessage?: string;
}

export default function SpinWheel({ names, onResult, levelUpMessage }: SpinWheelProps) {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const data = {
    labels: names,
    datasets: [
      {
        data: names.map(() => 1),
        backgroundColor: names.map((_, i) =>
          i % 2 === 0 ? "#2c3e50" : "#95a5a6"
        ),
        borderWidth: 2,
      },
    ],
  };

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);

    const chart = chartRef.current;
    if (!chart) return;

    const rotation = Math.random() * 360 + 1440;
    chart.options.rotation = rotation;
    chart.update();

    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * names.length);
      const selected = names[winnerIndex];
      setWinner(selected);
      onResult(selected);
      setIsSpinning(false);
    }, 3000);
  }

  return (
    
    <div className={styles.wheelContainer}>
      {/* Mensagem de Level Up acima da roleta */}
      {levelUpMessage && <div className={styles.levelMessage}>{levelUpMessage}</div>}
      <div className={styles.wheelWrapper} onClick={spin}>
        <div className={styles.pointer}></div>
        <Doughnut
          ref={chartRef}
          data={data}
          options={{
            plugins: { legend: { display: false } },
            animation: { duration: 3000, easing: "easeOutQuart" },
          }}
        />
      </div>
      <p className={styles.message}>
        {winner
          ? `Winner: ${winner}`
          : isSpinning
          ? "Spinning..."
          : "Click to spin"}
      </p>
    </div>
  );
}
