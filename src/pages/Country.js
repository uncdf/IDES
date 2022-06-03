
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BarStacked from '../components/Charts/BarStacked';
import Radar from '../components/Charts/Radar';
import Radial from '../components/Charts/Radial';
import Footer from './../components/Footer'
const Country = () =>
{
	const param = useParams();
	const id = param.id;
	const year = param.year
	const { data: country, isLoading, isError } = useQuery(`${ id }`, async () =>
	{
		const res = await fetch(`/.netlify/functions/getCountry?id=${ param.id }&year=${ year }`)
		if (res.ok) return res.json();
		throw new Error("Something went wrong...")
	}, {
		retry: 2,
		retryDelay: 5 * 1000,
		staleTime: 30 * 1000 // 30 seconds
	})
	console.log(country)
	if (isLoading) return (
		<div className="absolute top-0 left-0 h-screen w-screen grid place-items-center bg-brand">
			<svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>)
	if (isError) return <h1>Something Went wrong...</h1>
	const get_percent = (rawNum) =>
	{
		const num = rawNum.toFixed(2);
		return Math.floor(num * 100);
	}
	const data = [
		{
			"id": "Digital Economy",
			// "label": "Digital Economy",
			// "value": Math.floor(country.fields["Digital Economy Score"] * 100),
			"data": [{
				"x": "Digital Economy",
				"y": get_percent(country.fields["Digital Economy Score"])
			}]

		},
		{
			"id": "Digital Inclusiveness",
			// "label": "Digital Economy",
			// "value": Math.floor(country.fields["Digital Economy Score"] * 100),
			"data": [{
				"x": "Digital Inclusiveness",
				"y": get_percent(country.fields["Digital Inclusiveness Score"])
			}]

		},
		{
			"id": "Gender Inclusiveness",
			// "label": "Digital Economy",
			// "value": Math.floor(country.fields["Digital Economy Score"] * 100),
			"data": [{
				"x": "Gender Inclusiveness",
				"y": get_percent(country.fields["Gender Inclusiveness Score"])
			}]

		},
	]


	const scores = [
		{
			"column": "Digital Inclusiveness -  Disabled (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Disabled"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - Disabled"]) - 100),
			"name": "Disabled"
		},
		{
			"column": "Digital Inclusiveness -  Elderly (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness Score - Elderly"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness Score - Elderly"]) - 100),
			"name": "Elderly"

		},
		{
			"column": "Digital Inclusiveness -  Migrants (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Migrants"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - Migrants"]) - 100),
			"name": "Migrants"

		},
		{
			"column": "Digital Inclusiveness -  MSMEs (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - MSMEs"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - MSMEs"]) - 100),
			"name": "MSMEs"

		},
		{
			"column": "Digital Inclusiveness -  Refugees (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness  - Refugees"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness  - Refugees"]) - 100),
			"name": "Refugees"

		},
		{
			"column": "Digital Inclusiveness -  Rural (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Rural"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - Rural"]) - 100),
			"name": "Rural"
		},
		{
			"column": "Digital Inclusiveness -  Youth (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Youth"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - Youth"]) - 100),
			"name": "Youth"
		},
		{
			"column": "Digital Inclusiveness -  Women (%)",
			"Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Women"]),
			"Digital Divide": Math.abs(get_percent(country.fields["Digital Inclusiveness - Women"]) - 100),
			"name": "Women"
		}
	]

	const score_keys = [
		"Digital Inclusiveness",
		"Digital Divide",
	]

	const policyAndRegulation = [
		{
			"Block": "Active Government Promotion",
			"score": get_percent(country.fields["1.1 Active Government Promotion"]),
		},
		{
			"Block": "Active Policy Promotion",
			"score": get_percent(country.fields["1.2 Active Policy Promotion"]),
		},
		{
			"Block": "Digital Economy Regulation",
			"score": get_percent(country.fields["1.3 Digital Economy Regulation"])
		},
	]

	const infrastructure = [{
		"Block": "ID Infrastructure",
		"score": get_percent(country.fields["2.1 ID Infrastructure"]),
	},
	{
		"Block": "Connectivity",
		"score": get_percent(country.fields["2.2 Connectivity"]),
	},
	{
		"Block": "ICT Usage and Ownership",
		"score": get_percent(country.fields["2.3 ICT Usage and Ownership"])
	},
	{
		"Block": "Digital Payments",
		"score": get_percent(country.fields["2.4 Digital Payments"])
	},
	]
	const innovation = [{
		"Block": "Innovation Community Development",
		"score": get_percent(country.fields["3.1 Innovation Community Development"]),
	},
	{
		"Block": "Level of Skills",
		"score": get_percent(country.fields["3.2 Level of Skills"]),
	},
	{
		"Block": "Supporting Infrastructure",
		"score": get_percent(country.fields["3.3 Supporting Infrastructure"])
	},
	{
		"Block": "Investment",
		"score": get_percent(country.fields["3.4 Investment"])
	},
	]
	const skills = [{
		"Block": "Basic Skills",
		"score": get_percent(country.fields["4.1 Basic Skills"]),
	},
	{
		"Block": "Digital Literacy",
		"score": get_percent(country.fields["4.2 Digital Literacy"]),
	},
	{
		"Block": "Financial Literacy",
		"score": get_percent(country.fields["4.3 Financial Literacy"])
	},]

	const pR = { name: "Policy and Regulation", color: "#F1B844" }
	const inf = { name: "Infrastructure", color: "#215686" }
	const innov = { name: "Innovation", color: "#517542" }
	const sk = { name: "Skills", color: "#ED703A" }
	return (
		<div>
			<div className="container mx-auto px-4 h-auto my-9 pb-2" >
				<div className="ml-4">
					<div className="space-y-2 xl:flex xl:justify-between xl:items-end lg:flex lg:justify-between lg:items-end ">
						<div className="space-y-2">
							<p className="text-sm">{year} / <span className="text-sm font-normal underline">{country.fields["Status"]}</span> </p>
							<div>
								<h1 className="text-2xl font-medium">{country.fields["Country"]}</h1>
								<p className="text-sm my-2">{country.fields["Clean"]}</p>
							</div>
						</div>
						<div className="text-sm pb-2">
							<p >For more information about IDES in {country.fields["Country"]}, contact: </p>
							<a className="text-brand flex items-center w-max" type="email" href={country.fields["Email"]}>
								<svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>{country.fields["Name"]}

							</a>
						</div>
					</div>
					<hr />
				</div>

				<div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 justify-center items-center my-8">
					<Radial data={data} />
					<BarStacked data={scores} score_keys={score_keys} />
				</div>
			</div>
			<div className="bg-gray-900 w-full h-auto mt-28 ">
				<div className="xl:container lg:container w-full mx-auto grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1">
					<Radar data={policyAndRegulation} total={get_percent(country.fields["Policy & Regulation"])} info={pR} />

					<Radar data={infrastructure} total={get_percent(country.fields["Infrastructure"])} info={inf} />

					<Radar data={innovation} total={get_percent(country.fields["Innovation"])} info={innov} />

					<Radar data={skills} total={get_percent(country.fields["Skills"])} info={sk} />
				</div>
			</div>
			<Footer show={false} />
		</div>
	)
}

export default Country
