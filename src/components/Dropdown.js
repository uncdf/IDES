import React from 'react'
import { useNavigate } from 'react-router';

const Dropdown = ({list,year}) => {
	let navigate = useNavigate();
	const options = (listItem) => {
		return <option value={listItem.id}>{listItem.value}</option>
	}

	const getSelected = (e) =>{
		navigate(`country/${year}/${e.target.value}`)
	}

	return (
		<select onChange={getSelected} className="text-black p-2 rounded w-full" >
			<option>Select a country...</option>
			{list.map((listItem) => options(listItem))}
		</select>
	)
}

export default Dropdown
