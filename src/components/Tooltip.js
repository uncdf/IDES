import React from "react"


const Tooltip = ({ countryName, countryFlag, data, ...props }) =>
{
	return (
		<div className="w-auto bg-brand py-2 px-4 text-white rounded shadow">
			<div className="flex space-x-4 items-start justify-between ">
				<div>
					<h1 className=" text-base pt-2">{countryName}</h1>
					<p>{props.year}</p>
					<p className=" font-bold">{props.status}</p>
				</div>
				<div>
					<img className="object-fit object-top w-16 h-16" src={countryFlag} alt={`Flag of ${ countryName }`} />
				</div>
			</div>
			<div className="scores my-2 w-48">
				<ul className=" text-base">
					<li className="flex justify-between text-sm">
						<p>Digital Economy Score:</p>
						<p>{data.digital_economy_score}%</p>
					</li>
					<li className="flex justify-between text-sm">Digital Inclusiveness: <span>{data.digital_inclusiveness_score}%</span></li>
					<li className="flex justify-between text-sm">Gender Inlusiveness: <span>{data.gender_inclusiveness_score}%</span></li>
				</ul>
			</div>
		</div >
	)
}

export default Tooltip
