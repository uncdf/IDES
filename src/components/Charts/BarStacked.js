import { ResponsiveMarimekko } from "@nivo/marimekko";
import React, { useState, useEffect } from "react";
const BarStacked = ({ data, score_keys }) => {
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
    <div className="space-y-4">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-medium">Digital Inclusiveness by Segment</h2>
        <p className="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse,
          sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium. Aspernatur
          blanditiis minima voluptatem?
        </p>
      </div>
      <div className="h-96">
        <ResponsiveMarimekko
          animate={false}
          data={data}
          layout={screenSize.dynamicWidth < 1280 ? "horizontal" : "vertical"}
          value="name"
          margin={{ top: 40, right: 10, bottom: 40, left: 70 }}
          padding={0.2}
          indexScale={{ type: "band", round: true }}
          colors={["#000099", "#99DEEE"]}
          borderColor={{ theme: "background" }}
          label={(e) => {
            return e.formattedValue + "% ";
          }}
          axisRight={null}
          axisBottom={{
            tickSize: 15,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 0,
          }}
          axisLeft={{
            tickSize: 15,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </div>
    </div>
  );
};

export default BarStacked;
