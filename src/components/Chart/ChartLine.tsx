"use client";

import { ResponsiveLine } from "@nivo/line";

export function ChartLine(props: any) {
  return (
    <ResponsiveLine
      padding={0.3}
      colors={({ color }) => color}
      margin={{ top: 10, right: 130, bottom: 40, left: 60 }}
      axisLeft={{
        tickValues: 5,
      }}
      pointSize={10}
      pointBorderWidth={2}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemDirection: "left-to-right",
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 20,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      {...props}
    />
  );
}
