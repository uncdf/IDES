import React from 'react'
import { ResponsiveRadar } from '@nivo/radar';
const Radar = ({data, ...props}) => {
	const {info, total} = props
	return (
		<div className="my-8 w-full h-auto">
			<div className="text-center">
				<h2 className=" font-bold text-lg" style={{color: info.color}}>{info.name}: {total}%</h2>
			</div>
			<div className="h-80 custom-text-color">
				<ResponsiveRadar
					data={data}
					keys={['score']}
					indexBy="Block"
					maxValue={100}
					colors={info.color}
					margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
					borderColor={{ from: 'color' }}
					dotSize={5}
					dotColor={{ theme: 'background' }}
					dotBorderWidth={2}
					motionConfig="wobbly"
					gridShape="linear"
					dotLabel={(e) => { return e.formattedValue + "% " }}
					enableDotLabel={true}
					curve="cardinalClosed"
					gridLabelOffset={-20}
				/>
			</div>

		</div>
	)
}

export default Radar
