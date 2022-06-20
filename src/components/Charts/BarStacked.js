import { ResponsiveMarimekko } from "@nivo/marimekko";
import React, { useState, useEffect } from "react";
const BarStacked = ({ data }) => {
  const ticksToShow = [
    "Rural",
    "Women",
    "Youth",
    "Elderly",
    "Refugees",
    "Migrants",
    "Disabled",
    "MSMEs",
  ];

  const [screenSize, getDimensions] = useState({
    dynamicWidth: window.innerWidth,
  });

  const setDimenstions = () => {
    getDimensions({
      dynamicWidth: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", setDimenstions);
    return () => {
      window.removeEventListener("resize", setDimenstions);
    };
  }, [screenSize]);

  return (
    <div className="container mx-auto py-12 border">
      <div className="p-4 space-y-4 w-3/4 text-center mx-auto">
        <h2 className="text-xl font-medium">Digital Inclusiveness by Segment</h2>
        <p className="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse,
          sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium. Aspernatur
          blanditiis minima voluptatem?
        </p>
      </div>
      <div className="h-96">
        <ResponsiveMarimekko
          data={data}
          id="name"
          value="inclusiveness"
          dimensions={[
            {
              id: "Digital Inclusiveness",
              value: "inclusiveness",
            },
            {
              id: "Digital Divide",
              value: "digitalDivide",
            },
          ]}
          innerPadding={15}
          axisTop={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          axisBottom={{
            tickSize: 1,
            legendOffset: 0,
            legendPosition: "middle",
            tickValues: [0, 10,20,30,40,50,60,70]

          }}
          gridYValues="linear scale"
          gridXValues={5}
          animate={false}
          label="name"
          margin={{ top: 40, right: 180, bottom: 100, left: 180 }}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          fill={[
            {
              match: {
                id: "Digital Inclusiveness",
              },
              id: "inclusiveness",
            },
            {
              match: {
                id: "Digital Divide",
              },
              id: "digitalDivide",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 0,
              itemWidth: 140,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "right-to-left",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "square",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BarStacked;
