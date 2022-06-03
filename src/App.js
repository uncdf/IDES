import Map from "./components/Map";
import { Routes, Route } from 'react-router-dom'
import Country from "./pages/Country";
import Nav from "./components/Nav";
import Scorecard from "./pages/About/Scorecard";
import { useMemo, useState } from "react";
import { YearContext } from './context/YearContext'
function App()
{
  const [year, setYear] = useState(2020);
  const [filter, setFilter] = useState("all")
  const [countries, setCountries] = useState(null)
  const value = useMemo(() =>
  ({
    year, setYear, filter, setFilter, countries, setCountries
  }), [year, filter, countries])

  return (
    <YearContext.Provider value={value}>
      <div className="App h-screen flex flex-col w-auto">
        <div>
          <Nav />
        </div>
        <div className="w-full h-full mt-20">
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="country/:year/:id" element={<Country />}></Route>
            <Route path="about/scorecard" element={<Scorecard />}></Route>
          </Routes>
        </div>
      </div>
    </YearContext.Provider>
  );


}

export default App;
