import React from 'react'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
const Radial = ({ data }) =>
{
	return (
    <div className=" bg-gray-50 shadow border rounded h-full">
      <div className="h-96 mt-2">
        <ResponsiveRadialBar
          data={data}
          padding={0.1}
          cornerRadius={2}
          maxValue={100}
          colors={["#2757A7", "#3366CC", "#6699FF"]}
          margin={{ top: 25, right: 0, bottom: 25, left: 0 }}
          radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
          circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
          enableLabels={true}
          labelsTextColor="#fff"
          label={(e) => {
            return e.formattedValue + "% ";
          }}
        />
      </div>
      <div className="my-4 w-3/4 mx-auto text-center">
        <h2 className="text-lg font-bold ">Digital Economy Score (%) </h2>
        <p >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse,
          sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium.
        </p>
      </div>
    </div>
  );
}

export default Radial
