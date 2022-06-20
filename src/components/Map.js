import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React,{ useEffect, useState, useRef, useContext } from "react";
import { useQuery } from "react-query";
import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { YearContext } from "./../context/YearContext";
import ReactTooltip from "react-tooltip";
import MapLegend from "./MapLegend";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_SECRET || process.env.MAPBOX_SECRET;
const colors = {
  inception: "#CCCCFF",
  startUp: "#9999FF",
  expansion: "#6666FF",
  consolidation: "#3333CC",
};
const getColor = (status) => {
  let color;
  switch (status) {
    case "Inception":
      color = colors.inception;
      break;
    case "Start-up":
      color = colors.startUp;
      break;
    case "Expansion":
      color = colors.expansion;
      break;
    case "Consolidation":
      color = colors.consolidation;
      break;
    default:
      break;
  }
  return color;
};

const Map = () => {
  const customTooltip = useRef(
    new mapboxgl.Popup({
      closeOnMove: true,
      closeButton: false,
      closeOnClick: true,
      offset: 35,
    }),
  );
  const { year, setYear, filter, setFilter, setCountries } = useContext(YearContext);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(94.747556);
  const [lat, setLat] = useState(11.620593);
  const [zoom, setZoom] = useState(2);

  let navigate = useNavigate();
  let dropdownList = null;
  const { data, isLoading, error, isError, refetch } = useQuery(
    `country-${year}`,
    async () => {
      const res = await fetch(`/.netlify/functions/getCountries?year=${year}`);
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong...");
    },
    {
      staleTime: 5 * 1000, // 5 seconds
      select: (data) => {
        const countries = data.map((country) => ({
          id: country.id,
          country_name: country.fields.Country,
          country_main_scores: {
            digital_economy_score: Math.floor(country.fields["Digital Economy Score"] * 100),
            digital_inclusiveness_score: Math.floor(
              country.fields["Digital Inclusiveness Score"] * 100,
            ),
            gender_inclusiveness_score: Math.floor(
              country.fields["Gender Inclusiveness Score"] * 100,
            ),
          },
          country_geo: country.fields.geo[0].url,
          country_status: country.fields.Status,
          country_flag: country.fields.Flag[0].url,
        }));

        dropdownList = countries.map((country) => {
          return { id: country.id, value: country.country_name };
        });

        return countries;
      },
      notifyOnChangeProps: ["data"],
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = (e) => {
    setYear(e.target.value);
    setFilter("all");
    refetch();
  };

  useEffect(() => {
    let currentMap = map.current;
    if (map.current) return; // initialize map only once
    if (!isLoading || !isError)
      currentMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/cjdomacena/ckuk5zeet0rcn17lk02os9tku",
        center: [lng, lat],
        zoom: zoom,
        dragPan: true,
        pitchWithRotate: false,
        dragRotate: false,
        trackResize: true,
        attributionControl: false,
      });
    currentMap.addControl(new mapboxgl.NavigationControl());
    currentMap.addControl(
      new mapboxgl.AttributionControl({ compact: false, offset: 150 }),
      "bottom-right",
    );
    currentMap.on("mouseover", () => {
      currentMap.getCanvas().style.cursor = "pointer";
    });
    currentMap.on("load", () => {
      const layers = currentMap.getStyle().layers;
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }

      if (data) {
        setCountries(data);
        switch (filter) {
          case "all":
            for (let i = 0; i < data.length; i++) {
              currentMap.addSource(data[i].country_name, {
                type: "geojson",
                data: data[i].country_geo,
              });
              currentMap.addLayer(
                {
                  id: `${data[i].country_name}-fill`,
                  type: "fill",
                  source: data[i].country_name,
                  paint: {
                    "fill-color": getColor(data[i].country_status),
                    "fill-opacity": 0.8,
                  },
                },
                firstSymbolId,
              );
              currentMap.addLayer({
                id: `${data[i].country_name}-outline`,
                type: "line",
                source: data[i].country_name,
                paint: {
                  "line-color": "#fff",
                  "line-width": 5,
                },
              });

              currentMap.on("mouseenter", `${data[i].country_name}-fill`, (e) => {
                const tooltipNode = document.createElement("div");
                ReactDOM.render(
                  <Tooltip
                    countryName={data[i].country_name}
                    countryFlag={data[i].country_flag}
                    data={data[i].country_main_scores}
                    year={year}
                    status={data[i].country_status}
                  />,
                  tooltipNode,
                );

                customTooltip.current
                  .setLngLat(e.lngLat)
                  .setDOMContent(tooltipNode)
                  .addTo(currentMap);
              });

              currentMap.on("click", `${data[i].country_name}-fill`, (e) => {
                navigate(`country/${year}/${data[i].id}`);
              });
            }
            break;
          case "inception":
            for (let i = 0; i < data.length; i++) {
              if (data[i].country_status === "Inception") {
                currentMap.addSource(data[i].country_name, {
                  type: "geojson",
                  data: data[i].country_geo,
                });
                currentMap.addLayer({
                  id: `${data[i].country_name}-fill`,
                  type: "fill",
                  source: data[i].country_name,
                  paint: {
                    "fill-color": getColor(data[i].country_status),
                    "fill-opacity": 0.8,
                  },
                });
                currentMap.addLayer({
                  id: `${data[i].country_name}-outline`,
                  type: "line",
                  source: data[i].country_name,
                  paint: {
                    "line-color": "#fff",
                    "line-width": 0.5,
                  },
                });

                currentMap.on("mouseenter", `${data[i].country_name}-fill`, (e) => {
                  const tooltipNode = document.createElement("div");
                  ReactDOM.render(
                    <Tooltip
                      countryName={data[i].country_name}
                      countryFlag={data[i].country_flag}
                      data={data[i].country_main_scores}
                      year={year}
                      status={data[i].country_status}
                    />,
                    tooltipNode,
                  );

                  customTooltip.current
                    .setLngLat(e.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(currentMap);
                });

                currentMap.on("click", `${data[i].country_name}-fill`, (e) => {
                  navigate(`country/${year}/${data[i].id}`);
                });
              }
            }
            break;
          case "expansion":
            for (let i = 0; i < data.length; i++) {
              if (data[i].country_status === "Expansion") {
                currentMap.addSource(data[i].country_name, {
                  type: "geojson",
                  data: data[i].country_geo,
                });
                currentMap.addLayer(
                  {
                    id: `${data[i].country_name}-fill`,
                    type: "fill",
                    source: data[i].country_name,
                    paint: {
                      "fill-color": getColor(data[i].country_status),
                      "fill-opacity": 0.8,
                    },
                  },
                  firstSymbolId,
                );
                currentMap.addLayer({
                  id: `${data[i].country_name}-outline`,
                  type: "line",
                  source: data[i].country_name,
                  paint: {
                    "line-color": "#fff",
                    "line-width": 0.5,
                  },
                });

                currentMap.on("mouseenter", `${data[i].country_name}-fill`, (e) => {
                  const tooltipNode = document.createElement("div");
                  ReactDOM.render(
                    <Tooltip
                      countryName={data[i].country_name}
                      countryFlag={data[i].country_flag}
                      data={data[i].country_main_scores}
                      year={year}
                      status={data[i].country_status}
                    />,
                    tooltipNode,
                  );

                  customTooltip.current
                    .setLngLat(e.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(currentMap);
                });

                currentMap.on("click", `${data[i].country_name}-fill`, (e) => {
                  navigate(`country/${year}/${data[i].id}`);
                });
              }
            }
            break;
          case "startup":
            for (let i = 0; i < data.length; i++) {
              if (data[i].country_status === "Start-up") {
                currentMap.addSource(data[i].country_name, {
                  type: "geojson",
                  data: data[i].country_geo,
                });
                currentMap.addLayer(
                  {
                    id: `${data[i].country_name}-fill`,
                    type: "fill",
                    source: data[i].country_name,
                    paint: {
                      "fill-color": getColor(data[i].country_status),
                      "fill-opacity": 0.8,
                    },
                  },
                  firstSymbolId,
                );
                currentMap.addLayer({
                  id: `${data[i].country_name}-outline`,
                  type: "line",
                  source: data[i].country_name,
                  paint: {
                    "line-color": "#fff",
                    "line-width": 0.5,
                  },
                });

                currentMap.on("mouseenter", `${data[i].country_name}-fill`, (e) => {
                  const tooltipNode = document.createElement("div");
                  ReactDOM.render(
                    <Tooltip
                      countryName={data[i].country_name}
                      countryFlag={data[i].country_flag}
                      data={data[i].country_main_scores}
                      year={year}
                      status={data[i].country_status}
                    />,
                    tooltipNode,
                  );

                  customTooltip.current
                    .setLngLat(e.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(currentMap);
                });

                currentMap.on("click", `${data[i].country_name}-fill`, (e) => {
                  navigate(`country/${year}/${data[i].id}`);
                });
              }
            }
            break;
          case "consolidation":
            for (let i = 0; i < data.length; i++) {
              if (data[i].country_status === "Consolidation") {
                currentMap.addSource(data[i].country_name, {
                  type: "geojson",
                  data: data[i].country_geo,
                });
                currentMap.addLayer({
                  id: `${data[i].country_name}-fill`,
                  type: "fill",
                  source: data[i].country_name,
                  paint: {
                    "fill-color": getColor(data[i].country_status),
                    "fill-opacity": 0.8,
                  },
                },firstSymbolId);
                currentMap.addLayer(
                  {
                    id: `${data[i].country_name}-outline`,
                    type: "line",
                    source: data[i].country_name,
                    paint: {
                      "line-color": "#fff",
                      "line-width": 0.5,
                    },
                  },
                  
                );

                currentMap.on("mouseenter", `${data[i].country_name}-fill`, (e) => {
                  const tooltipNode = document.createElement("div");
                  ReactDOM.render(
                    <Tooltip
                      countryName={data[i].country_name}
                      countryFlag={data[i].country_flag}
                      data={data[i].country_main_scores}
                      year={year}
                      status={data[i].country_status}
                    />,
                    tooltipNode,
                  );

                  customTooltip.current
                    .setLngLat(e.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(currentMap);
                });

                currentMap.on("click", `${data[i].country_name}-fill`, (e) => {
                  navigate(`country/${year}/${data[i].id}`);
                });
              }
            }
            break;
          default:
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter, year]);

  if (isError) {
    return <h1>Something went wrong... {error.message}</h1>;
  }

  const dropdown = () => {
    return (
      <aside className="absolute top-5 left-2 w-64 sm:hidden xs:hidden md:hidden xl:block lg:block hidden">
        <div className="my-4 space-y-2">
          <div>
            <Link to="about/scorecard">
              <button className="px-6 py-2 bg-brand w-full text-gray-50 rounded hover:bg-brand-400">
                Scorecard
              </button>
            </Link>
          </div>
          <div>
            <Link to="about/scorecard">
              <button className="px-6 py-2 bg-brand w-full text-gray-50 rounded hover:bg-brand-400">
                Methodology
              </button>
            </Link>
          </div>
          <div>
            <Link to="about/scorecard">
              <button className="px-6 py-2 bg-brand w-full text-gray-50 rounded hover:bg-brand-400">
                Market Development Stages
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-brand h-auto w-full">
          <div className="p-4">
            <div className="text-white mb-4 space-y-2">
              <h2 className="text-lg font-medium">Inclusive Digital Economy Scorecard</h2>
              <p className="text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id eaque assumenda neque
                optio, magni quo.
              </p>
            </div>
            <Dropdown list={dropdownList} year={year} />
          </div>
        </div>
      </aside>
    );
  };

  const loading = () => {
    return (
      <div className="absolute top-0 left-0 h-full w-full grid place-items-center bg-brand z-50">
        <svg
          class="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  };
  return (
    <div className="w-full h-full relative">
      {isError ? <h1>Something went wrong... {error.message} </h1> : ""}
      <div className="w-full h-full cursor-pointer" ref={mapContainer} id="map-container"></div>
      {isLoading ? loading() : dropdown()}
      <aside className="absolute xl:bottom-40 lg:botttom-40 md:bottom-40  bottom-16 w-full">
        <div className="mb-4 w-96 text-sm font-semibold mx-auto mt-8 flex items-center justify-between text-white">
          <MapLegend color={colors.inception} name="Inception" type="inception" />
          <MapLegend color={colors.startUp} name="Start-Up" type="startup" />
          <MapLegend color={colors.expansion} name="Expansion" type="expansion" />
          <MapLegend color={colors.consolidation} name="Consolidation" type="consolidation" />
        </div>
        <div className="flex items-center justify-between bg-gray-800 px-8 py-4 rounded text-gray-50 w-96 mx-auto">
          <button
            onClick={handleClick}
            value="2020"
            className={year == 2020 ? `font-bold` : ""}
            data-tip=""
            data-for="2020">
            2020
          </button>
          <ReactTooltip type="dark" place="top" id="2020" />

          <button
            value="2021"
            className={year == 2021 ? `font-bold` : ""}
            data-tip="Data will be available in 2022"
            data-for="2021">
            2021
          </button>
          <ReactTooltip type="dark" place="top" id="2021" />

          <button data-tip="Data will be available in 2023" data-for="2022">
            2022
          </button>
          <ReactTooltip type="dark" place="top" id="2022" />

          <button data-tip="Data will be available in 2024" data-for="2023">
            2023
          </button>
          <ReactTooltip type="dark" place="top" id="2023" />
        </div>
      </aside>
      <Footer />
    </div>
  );
};

export default Map;
