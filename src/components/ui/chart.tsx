/**
 * Pure Frontend Chart Components
 * Simple chart implementations without external dependencies
 */

import * as React from "react";
import { cn } from "./utils";

interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
}

interface ChartContextType {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextType | null>(null);

const useChart = () => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
};

// Simple CSS-based chart styles
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).reduce((styles, [key, value]) => {
    if (value.color) {
      return [...styles, `--color-${key}: ${value.color};`];
    }
    return styles;
  }, [] as string[]);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-chart="${id}"] {
            ${colorConfig.join("\n")}
          }
        `,
      }}
    />
  );
};

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: {
  id: string;
  className?: string;
  config: ChartConfig;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </ChartContext.Provider>
  );
}

// Simple bar chart implementation
const SimpleBarChart = ({ 
  data, 
  className,
  ...props 
}: { 
  data: Array<{ name: string; value: number; color?: string }>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className={cn("w-full h-full flex items-end gap-2 p-4", className)} {...props}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div 
            className="w-full bg-primary rounded-t-sm min-h-[4px]"
            style={{ 
              height: `${(item.value / maxValue) * 80}%`,
              backgroundColor: item.color || 'var(--color-primary)'
            }}
          />
          <span className="text-xs text-muted-foreground text-center">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Simple line chart implementation
const SimpleLineChart = ({ 
  data, 
  className,
  ...props 
}: { 
  data: Array<{ name: string; value: number }>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className={cn("w-full h-full p-4", className)} {...props}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          points={points}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1"
              fill="var(--color-primary)"
            />
          );
        })}
      </svg>
    </div>
  );
};

// Mock tooltip and legend components for compatibility
const ChartTooltip = ({ children }: { children?: React.ReactNode }) => (
  <div className="hidden">{children}</div>
);

const ChartTooltipContent = ({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("hidden", className)} {...props} />
);

const ChartLegend = ({ children }: { children?: React.ReactNode }) => (
  <div className="hidden">{children}</div>
);

const ChartLegendContent = ({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("hidden", className)} {...props} />
);

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  SimpleBarChart,
  SimpleLineChart,
  useChart,
  type ChartConfig,
};