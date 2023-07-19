"use client";

import { ResponsiveBar } from "@nivo/bar";

export function ChartBar(props: any) {
  return (
    <ResponsiveBar
      margin={{ top: 10, right: 130, bottom: 40, left: 120 }}
      padding={0.3}
      colors={({ id, data }) => data[`${id}Color`]}
      label={null}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      {...props}
    />
  );
}
