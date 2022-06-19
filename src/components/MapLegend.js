import React, { useContext } from "react"
import { YearContext } from "../context/YearContext"
const MapLegend = ({...props}) => {
	const {setFilter} = useContext(YearContext);


	return (
		<div className="flex items-center space-x-1 cursor-pointer hover:opacity-80" onClick={() => setFilter(props.type)}>
			<p className="w-4 h-4" style={{ background: props.color }}></p><span>{props.name}</span>
		</div>
	)
}

export default MapLegend
