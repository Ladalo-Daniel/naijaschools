"use client";

import { Card } from "@nextui-org/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  InteractionItem,
} from "chart.js";
import { MouseEvent, useRef } from "react";

import { Line, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from "react-chartjs-2";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Admin Line chart View',
      },
    },
  };

const LineChart = ({ data, labels }: { data: number[], labels: string[] }) => {
    const toastDatasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;
    
        const datasetIndex = dataset[0].datasetIndex;
            toast.info(`${data[datasetIndex]} items in ${labels[datasetIndex]}`)
        }
    
      const chartRef = useRef<ChartJS>(null);
    
      const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;
    
        if (!chart) {
          return;
        }
    
        toastDatasetAtEvent(getDatasetAtEvent(chart, event))
      };
    return (
      <Card className="h-[500px] max-w-[1400px] max-sm:w-full flex-1 p-6">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Overview",
                data: data,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
          options={options}
          ref={chartRef as any}
          onClick={onClick}
        />
      </Card>
    );
  };

  export default LineChart;