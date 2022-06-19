
import React, { useContext } from "react"
import { YearContext } from './../context/YearContext'
import { useNavigate } from "react-router"
const CountryMenu = () =>
{
	let navigate = useNavigate();
	const { countries, year } = useContext(YearContext)
	const handleClick = (countryID) =>
	{
		navigate(`country/${ year }/${ countryID }`)
	}
	return (
		<div>
			{countries ? <div className="absolute top-14 right-0 w-max h-auto bg-gray-900 z-50 rounded opacity-90">
				<div className="grid grid-cols-4 gap-4 p-4">
					{countries.map((country, index) =>
					{
						return (
							<div className="flex space-x-2 cursor-pointer hover:text-brand-100" key={index} onClick={() => handleClick(country.id)}>
								<img src={country.country_flag} className="w-8 h-full object-fit" alt={`flag of ${ country.country_name }`} />
								<p>{country.country_name}</p>
							</div>
						)
					})}
				</div>

			</div> : ""}
		</div>
	)
}

export default CountryMenu
