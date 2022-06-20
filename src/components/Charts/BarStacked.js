import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
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
    <div className="space-y-4 container mx-auto p-4 border bg-gray-50 rounded shadow">
      <div className="space-y-4 w-3/4 mx-auto text-center p-4">
        <h2 className="text-xl font-medium">Digital Inclusiveness by Segment</h2>
        <p className="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse,
          sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium. Aspernatur
          blanditiis minima voluptatem?
        </p>
      </div>
      <div className="h-96">
        <ResponsiveBar
          data={data}
          keys={score_keys}
          maxValue={100}
          layout={screenSize.dynamicWidth < 1280 ? "horizontal" : "vertical"}
          indexBy="name"
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
          legends={[
            {
              dataFrom: "keys",
              anchor: "top",
              direction: "row",
              justify: false,
              translateX: -25,
              translateY: -40,
              itemsSpacing: 50,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolShape: "circle",
              symbolSize: 15,
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
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          labelFormat="formattedValue"
          role="application"
          ariaLabel="Digital Inclusiveness by Segment"
          barAriaLabel={function (e) {
            return e.id + ": " + e.formattedValue + "%, ";
          }}
        />
      </div>
    </div>
  );
};

export default BarStacked;
