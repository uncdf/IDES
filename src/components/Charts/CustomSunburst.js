import { ResponsiveSunburst } from "@nivo/sunburst";

const CustomSunburst = ({ data }) => {
  <div className="space-y-4">
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-medium ">Three Main Scores (%) </h2>
      <p className="text-sm leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse,
        sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium. Aspernatur
        blanditiis minima voluptatem?
      </p>
    </div>
    <div className="h-96">
      <ResponsiveSunburst />
    </div>
  </div>;
};

export default CustomSunburst;
