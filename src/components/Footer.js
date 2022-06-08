import { useState } from "react"
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
const Footer = ({show = true}) =>
{
	const [isShowing, setIsShowing] = useState(true);
	return (
    <footer className={`"h-auto w-full fixed p-4 bottom-0 left-0 opacity-70 bg-gray-900 p-4"`}>
      {isShowing ? (
        <>
          <div className=" w-4/5 mx-auto h-full text-white mb-4 sm:hidden xs:hidden md:block lg:block xl:block hidden relative">
            <div className="flex">
              <p className="text-white opacity-100 text-sm text-center mx-auto">
                The designations employed and the presentation of material on the maps and graphs
                contained in this publication do not imply the expression of any opinion whatsoever
                on the part of the UNCDF or the Secretariat of the United Nations or any of its
                affiliated organizations or its Member States concerning the legal status of any
                country, territory, city, or area or tis authorities, or concerning the delimination
                of its frontiers.
              </p>
            </div>
          </div>

          <button
            className=" flex absolute right-12 top-4 text-white"
            onClick={() => setIsShowing(false)}>
            Hide
            <AiFillCaretDown className="w-6 h-6 " />
          </button>
        </>
      ) : (
        <button
          className=" flex absolute right-12 top-4 text-white"
          onClick={() => setIsShowing(true)}>
          Show
          <AiFillCaretUp className="w-6 h-6 " />
        </button>
      )}
      <div className="w-full h-auto p-2">
        <div className="w-automx-auto text-white text-center">
          <ul className="flex space-x-2  items-center justify-center px-2 text-sm">
            <li>
              <copyright>© 2021 UNCDF </copyright>{" "}
            </li>
            <li>|</li>
            <li className="underline">
              <a href="https://www.uncdf.org/terms-of-use" referrerPolicy="no-referrer">
                Terms of Use{" "}
              </a>
            </li>
            <li>|</li>
            <li className="underline">
              <a
                href="https://www.uncdf.org/information-disclosure-policy"
                referrerPolicy="no-referrer">
                Information Disclosure Policy{" "}
              </a>
            </li>
            <li>|</li>
            <li className="underline">
              <a href="https://www.uncdf.org/copyright" referrerPolicy="no-referrer">
                Copyright
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer
