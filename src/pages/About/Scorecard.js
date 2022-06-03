import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Eu } from './../../assets/memberLogo/eu.svg'
import { ReactComponent as Gsma } from './../../assets/memberLogo/gsma.svg'
import { ReactComponent as Unctad } from './../../assets/memberLogo/unctad.svg'
import undesa from './../../assets/memberLogo/undesa.png'
import undp from './../../assets/memberLogo/UNDP.png'


const Scorecard = () =>
{

	return (
		<div className="container mx-auto my-8">

			<div className="bg-gray-100 p-8 rounded space-y-4 mt-8">
				<ul className="flex space-x-2 mb-4 border-b pb-2 border-gray-900 text-sm">
					<li className="hover:text-brand"><Link to="/"> About </Link></li>
					<li>/</li>
					<li className="hover:text-brand font-semibold"><Link to="/about/scorecard">Scorecard</Link></li>
					<li>/</li>
					<li ><Link to="/about/scorecard" className="hover:text-brand">Methodology</Link></li>
					<li>/</li>
					<li className="hover:text-brand"><Link to="/">Market Development Stages</Link></li>
				</ul>
				<div className="space-y-4 pt-4">
					<h1 className="text-2xl font-semibold">About the Scorecard</h1>
					<p className="leading-relaxed">The Inclusive Digital Economy Scorecard (IDES) is a strategic performance and policy tool that has been developed to support countries in better understanding and monitoring the status of their digital transformation, with a view to helping them make it more inclusive. The IDES identifies the key market constraints hindering the development of an inclusive digital economy and helps governments to set the right priorities with public and private stakeholders, to foster accelerated development of a digital economy that leaves no one behind.</p>
					<p className="leading-relaxed">The IDES is a strategic performance tool developed by the United Nations Capital Development Fund (UNCDF), supported by a reference group of like-minded organizations (GSMA, EU, UNDP, UNCTAD, UN-DESA) and governments in four least developed countries (LDCs): Burkina Faso, Nepal, Solomon Islands and Uganda. The input from the reference group has helped to refine the scorecard and its indicators and, more broadly, drive forward the agenda of the measurement of inclusive digital economies. </p>
					<p className="leading-relaxed">Starting in 2021, the IDES has been implemented in 25 countries in Africa, Asia and the Pacific, and will be expanded to additional countries in 2022. Governments will be supported in measuring their progress over time, with the IDES data and scores for each country collected on an annual basis. </p>
					<p>All the country-level IDES scores can be accessed via the map and the reports in the library. </p>
					<div className="pt-4">
						<p>IDES Reference Group Member: </p>
						<div className="flex space-x-8 items-center mt-8">
							<img src={undp} alt="UNDESA Logo" className="w-auto h-auto object-contain" />
							<Eu className="w-24 h-auto" />
							<Gsma className="w-24 h-auto" />
							<Unctad className="w-24 h-auto" />
							<img src={undesa} alt="UNDESA Logo" className="w-24 h-auto object-contain" />

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Scorecard
