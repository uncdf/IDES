import React from 'react'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
const Radial = ({ data }) =>
{
	return (
		<div className="space-y-4">
			<div className="p-4 space-y-4">
				<h2 className="text-xl font-medium ">Three Main Scores (%) </h2>
				<p className="text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit neque esse, sapiente dicta distinctio fuga rem atque? Inventore, officiis laudantium. Aspernatur blanditiis minima voluptatem?</p>
			</div>
			<div className="h-96">
				<ResponsiveRadialBar
					data={data}
					padding={0.1}
					cornerRadius={2}
					maxValue={100}
					colors={["#2757A7", "#3366CC", "#6699FF"]}
					margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
					radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
					circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
					enableLabels={true}
					labelsTextColor="#fff"
					label={(e) => { return e.formattedValue + "% " }}
					
				/>
			</div>
		</div>
	)
}

export default Radial
