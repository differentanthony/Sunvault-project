import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
} from "react-financial-charts";
import { useEffect, useRef, useState, useMemo } from "react";
import { last } from "lodash";
import { mockData, CandleData } from "@/components/ui/mockData"; // Importing the mockData
import { select } from "d3-selection"; // Import d3's select function

export default function CandleChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [isMobile, setIsMobile] = useState(false);

  // Auto Resize for Responsive Charts
  useEffect(() => {
    const updateSize = () => {
      if (chartContainerRef.current) {
        setDimensions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    // Set initial size
    updateSize();

    // Listen to window resize events
    window.addEventListener("resize", updateSize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", updateSize);
  }, []); // Empty dependency array ensures this runs once on mount and unmount

  // Detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Only run on mount and unmount

  // Memoizing the xScaleProvider to avoid unnecessary re-calculations
  const { data, xScale, xAccessor, displayXAccessor } = useMemo(() => {
    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: CandleData) => d.date);
    return xScaleProvider(mockData);
  }, []); // Only re-run the function when dependencies change (empty dependency array ensures it runs once)

  // Apply custom styles to XAxis labels
  useEffect(() => {
    const svg = chartContainerRef.current?.querySelector("svg");
    if (svg) {
      const ticks = select(svg)
        .selectAll(".tick text") // Select all tick labels
        .style("fill", "#FF5733") // Apply color
        .style("font-size", "12px") // Apply font size
        .style("font-weight", "bold"); // Apply font weight
    }
  }, [data]); // Re-run when data changes

  return (
    <div ref={chartContainerRef} className="w-full h-full flex justify-center items-center">
      <ChartCanvas
        height={dimensions.height}
        width={dimensions.width}
        ratio={1}
        seriesName="InvestmentChart"
        data={data}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={[xAccessor(data[0]), xAccessor(last(data))]}
      >
        <Chart id={1} yExtents={(d: CandleData) => [d.high, d.low]}>
          {/* Explicitly typing the tickFormat function */}
          <XAxis
            showGridLines
            tickFormat={(d: any) => {
              const date = new Date(d); // Ensure `d` is a Date object
              return date.toLocaleDateString(); // Correct usage of `toLocaleDateString`
            }}
          />
          <YAxis showGridLines />
          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    </div>
  );
}
