
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from './../assets/29.01.18-UNCDF-white-logo-tagline.svg'
import CountryMenu from "./CountryMenu";
const Nav = () =>
{
	const expandRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const handleMouseOver = () =>
	{
		setIsOpen(true)
	}

	const handleClick = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() =>
	{
		const handleClickOutside = (e) =>
		{
			if (!expandRef.current.contains(e.target) && isOpen)
			{
				setIsOpen(false)
			}
		}
		if (isOpen)
		{
			document.addEventListener("mousedown", handleClickOutside)

		}
		return () =>
		{
			document.removeEventListener("click", handleClickOutside)
		}
	}, [isOpen])

	return (
		<nav className="w-full bg-brand h-20 fixed top-0 z-50">
			<div className="xl:container xl:mx-auto flex justify-between text-white items-center h-full px-4">
				<div className="flex space-x-4 items-center">
					<div>
						<Link to="/">
							<LogoSVG className="w-36 h-36" />
						</Link>
					</div>
					<div>
						<h1 className="text-xl font-semibold sm:hidden md:hidden lg:flex xl:flex hidden">
							<Link to="/">
								Inclusive Digital Economy Scorecard
							</Link>
						</h1>
					</div>
				</div>
				<ul className="hidden space-x-6 xs:hidden sm:hidden md:hidden lg:flex xl:flex">
					<li className="hover:text-brand-100"><Link to="/">Map</Link></li>
					<li className="relative" ref={expandRef} onMouseEnter={() => handleMouseOver()} onClick={() => handleClick()}>
						<button className="hover:text-brand-100"  >Countries</button>
						{isOpen ? <CountryMenu /> : ""}
						{console.log(isOpen)}
					</li>

					<li className="hover:text-brand-100"><Link to="/">About</Link></li>
					<li className="hover:text-brand-100"><Link to="/">Contact</Link></li>
				</ul>
				{/* <div className="block space-x-6 xs:hidden sm:block md:block lg:hidden xl:hidden">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
					<div className="h-screen w-screen absolute right-0 top-0 z-50 bg-gray-900 grid place-items-center">
						<div className="grid grid-flow-row">
							<ul className="space-y-8 text-gray-50 text-center  ">
								<li className="hover:text-brand-100"><Link to="/">Map</Link></li>
								<li className="hover:text-brand-100">
									<Link to="/">Countries</Link>
								</li>

								<li className="hover:text-brand-100"><Link to="/">About</Link></li>
								<li className="hover:text-brand-100"><Link to="/">Contact</Link></li>
							</ul>
						</div>
					</div>
				</div> */}
			</div>

	

		</nav>
	)
}

export default Nav;