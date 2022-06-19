import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResponsiveSunburst } from "@nivo/sunburst";
import Radial from "../components/Charts/Radial";
import Footer from "./../components/Footer";
import Radar from "../components/Charts/Radar";
import {FiMail} from 'react-icons/fi'
import { useTheme } from "@nivo/core";

const Country = () => {
  const param = useParams();
  const id = param.id;
  const year = param.year;
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery(
    `${id}`,
    async () => {
      const res = await fetch(`/.netlify/functions/getCountry?id=${param.id}&year=${year}`);
      if (res.ok) return res.json();
      throw new Error("Something went wrong...");
    },
    {
      retry: 2,
      retryDelay: 5 * 1000,
      staleTime: 30 * 1000, // 30 seconds
    },
  );
  if (isLoading)
    return (
      <div className="absolute top-0 left-0 h-screen w-screen grid place-items-center bg-brand">
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
  if (isError) return <h1>Something Went wrong...</h1>;
  const get_percent = (rawNum) => {
    const num = rawNum.toFixed(2);
    return Math.floor(num * 100);
  };
  const data = [
    {
      id: "Digital Economy",
      // "label": "Digital Economy",
      // "value": Math.floor(country.fields["Digital Economy Score"] * 100),
      data: [
        {
          x: "Digital Economy",
          y: get_percent(country.fields["Digital Economy Score"]),
        },
      ],
    },
  ];

  const policyAndRegulation = [
    {
      Block: "Active Government Promotion",
      score: get_percent(country.fields["1.1 Active Government Promotion"]),
    },
    {
      Block: "Active Policy Promotion",
      score: get_percent(country.fields["1.2 Active Policy Promotion"]),
    },
    {
      Block: "Digital Economy Regulation",
      score: get_percent(country.fields["1.3 Digital Economy Regulation"]),
    },
  ];

  const infrastructure = [
    {
      Block: "ID Infrastructure",
      score: get_percent(country.fields["2.1 ID Infrastructure"]),
    },
    {
      Block: "Connectivity",
      score: get_percent(country.fields["2.2 Connectivity"]),
    },
    {
      Block: "ICT Usage and Ownership",
      score: get_percent(country.fields["2.3 ICT Usage and Ownership"]),
    },
    {
      Block: "Digital Payments",
      score: get_percent(country.fields["2.4 Digital Payments"]),
    },
  ];
  const innovation = [
    {
      Block: "Innovation Community Development",
      score: get_percent(country.fields["3.1 Innovation Community Development"]),
    },
    {
      Block: "Level of Skills",
      score: get_percent(country.fields["3.2 Level of Skills"]),
    },
    {
      Block: "Supporting Infrastructure",
      score: get_percent(country.fields["3.3 Supporting Infrastructure"]),
    },
    {
      Block: "Investment",
      score: get_percent(country.fields["3.4 Investment"]),
    },
  ];
  const skills = [
    {
      Block: "Basic Skills",
      score: get_percent(country.fields["4.1 Basic Skills"]),
    },
    {
      Block: "Digital Literacy",
      score: get_percent(country.fields["4.2 Digital Literacy"]),
    },
    {
      Block: "Financial Literacy",
      score: get_percent(country.fields["4.3 Financial Literacy"]),
    },
  ];

  const pR = { name: "Policy and Regulation", color: "#F1B844" };
  const inf = { name: "Infrastructure", color: "#215686" };
  const innov = { name: "Innovation", color: "#517542" };
  const sk = { name: "Skills", color: "#ED703A" };

  const dataz = {
    name: "Digital Economy Scores",
    children: [
      {
        name: "1. Policy and Regulation",
       
        color: "hsl(45,100,70)",
        children: [

          {
            name: "1.1 Government Promotion",
            loc: get_percent(country.fields["1.1 Active Government Promotion"]),
          },
          {
            name: "1.2 Policy Promotion",
            loc: get_percent(country.fields["1.2 Active Policy Promotion"]),
          },
          {
            name: "1.3 DE Regulation",
            loc: get_percent(country.fields["1.3 Digital Economy Regulation"]),
          },
        ],
      },
      {
        name: "2. Infrastructure",

        color: "hsl(0,0,35)",

        children: [
          {
            name: "2.1 ID Infrastructure",
            loc: get_percent(country.fields["2.1 ID Infrastructure"]),
          },
          {
            name: "2.2 Connectivity",
            loc: get_percent(country.fields["2.2 Connectivity"]),
          },
          {
            name: "2.3 ICT Usage and Ownership",
            loc: get_percent(country.fields["2.3 ICT Usage and Ownership"]),
          },
          {
            name: "2.4 Digital Payments",
            loc: get_percent(country.fields["2.4 Digital Payments"]),
          },
        ],
      },
      {
        name: "3. Innovation",
        color: "hsl(96,42,69)",
        children: [
          {
            name: "3.1 Innovation Community Development",
            loc: get_percent(country.fields["3.1 Innovation Community Development"]),
          },
          {
            name: "3.2 Level of Skills",
            loc: get_percent(country.fields["3.2 Level of Skills"]),
          },
          {
            name: "3.3 Supporting Infrastructure",
            loc: get_percent(country.fields["3.3 Supporting Infrastructure"]),
          },
          {
            name: "3.4 Investment",
            loc: get_percent(country.fields["3.4 Investment"]),
          },
        ],
      },
      {
        name: "4. Skills",
        color: "hsl(24,84,74)",
        children: [
          {
            name: "4.1 Basic Skills",
            loc: get_percent(country.fields["4.1 Basic Skills"]),
          },
          {
            name: "4.2 Digital Literacy",
            loc: get_percent(country.fields["4.2 Digital Literacy"]),
          },
          {
            name: "4.3 Financial Literacy",
            loc: get_percent(country.fields["4.3 Financial Literacy"]),
          },
        ],
      },
    ],
  };

  const scores = [
    {
      column: "Digital Inclusiveness -  Disabled (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Disabled"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - Disabled"]) - 100,
      ),
      name: "Disabled",
    },
    {
      column: "Digital Inclusiveness -  Elderly (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness Score - Elderly"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness Score - Elderly"]) - 100,
      ),
      name: "Elderly",
    },
    {
      column: "Digital Inclusiveness -  Migrants (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Migrants"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - Migrants"]) - 100,
      ),
      name: "Migrants",
    },
    {
      column: "Digital Inclusiveness -  MSMEs (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - MSMEs"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - MSMEs"]) - 100,
      ),
      name: "MSMEs",
    },
    {
      column: "Digital Inclusiveness -  Refugees (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness  - Refugees"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness  - Refugees"]) - 100,
      ),
      name: "Refugees",
    },
    {
      column: "Digital Inclusiveness -  Rural (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Rural"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - Rural"]) - 100,
      ),
      name: "Rural",
    },
    {
      column: "Digital Inclusiveness -  Youth (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Youth"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - Youth"]) - 100,
      ),
      name: "Youth",
    },
    {
      column: "Digital Inclusiveness -  Women (%)",
      "Digital Inclusiveness": get_percent(country.fields["Digital Inclusiveness - Women"]),
      "Digital Divide": Math.abs(
        get_percent(country.fields["Digital Inclusiveness - Women"]) - 100,
      ),
      name: "Women",
    },
  ];

  const score_keys = ["Digital Inclusiveness", "Digital Divide"];

const CustomTooltip = ({ id, value, color }) => {
  const theme = useTheme();
  const getScore = () => {
    switch (id) {
      case "1. Policy and Regulation": {
        return `${id}: ${get_percent(country.fields["Policy & Regulation"])}%`;
      }
      case "2. Infrastructure": {
        return `${id}: ${get_percent(country.fields["Infrastructure"])}%`;
      }
      case "3. Innovation": {
        return `${id}: ${get_percent(country.fields["Innovation"])}%`;
      }
      case "4. Skills": {
        return `${id}: ${get_percent(country.fields["Skills"])}%`;
      }
      default: {
        return `${id}: ${value}%`;
      }
    }
  }


    return (
        <p style={{...theme.tooltip.container }}>
         {getScore()}
      </p>
    )
}


  return (
    <section>
      <div className="container mx-auto px-4 h-auto mt-4">
        <div className="ml-4">
          <div className="space-y-2 xl:flex xl:justify-between xl:items-end lg:flex lg:justify-between lg:items-end ">
            <div className="space-y-2">
              <div>
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 h-16"
                    alt={`Flag of ${country.fields["Country"]}`}
                    src={country.fields["Flag"][0].url}
                  />
                  <div>
                    <h1 className="text-2xl font-medium">{country.fields["Country"]}</h1>
                    <p className="font-bold">{year}</p>
                  </div>
                </div>

                <p className=" my-2">{country.fields["Clean"]}</p>
              </div>
            </div>
            <div className="text-sm pb-2 space-y-1">
              <p className="font-bold leading-relaxed text-lg">{country.fields["Status"]}</p>{" "}
              <p>For more information about IDES in {country.fields["Country"]}, contact: </p>
              <a
                className="text-brand flex items-center w-max hover:text-gray-600 transition-colors"
                type="email"
                href={country.fields["Email"]}>
                <FiMail className="w-6 h-6 mr-1"/>
                {country.fields["Name"]}
              </a>
            </div>
          </div>
          <hr />
        </div>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 justify-center items-center my-8 text-gray-700 gap-2">
          <Radial data={data} />
          <div className="bg-gray-50 border rounded p-4 shadow">
            <div className="h-96 w-full">
              <ResponsiveSunburst
                data={dataz}
                tooltip={CustomTooltip}
                inheritColorFromParent={true}
                margin={{ top: 0, right: 25, bottom: 0, left: 25 }}
                id="name"
                value="loc"
                colors={{ scheme: "paired" }}
                cornerRadius={2}
                borderWidth={3}
                childColor={{
                  from: "color",
                  modifiers: [["darker", 0.1]],
                }}
                enableArcLabels={true}
                arcLabelsSkipAngle={50}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 5]],
                }}
                arcLabel="id"
              />
            </div>
            <div className="my-4 w-3/4 mx-auto text-center">
              <h1 className="text-lg font-bold">High Level Scores (%)</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum quae sequi,
                iure cumque accusantium tempora.
              </p>
            </div>
          </div>

          {/*
           */}
        </div>
      </div>

      {/* <div className="h-96 w-full">
        <BarStacked data={scores} score_keys={score_keys} />
      </div> */}

      <div className="bg-gray-900 w-full h-auto">
        <div className="xl:container lg:container w-full mx-auto grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1">
          <Radar
            data={policyAndRegulation}
            total={get_percent(country.fields["Policy & Regulation"])}
            info={pR}
          />

          <Radar
            data={infrastructure}
            total={get_percent(country.fields["Infrastructure"])}
            info={inf}
          />

          <Radar data={innovation} total={get_percent(country.fields["Innovation"])} info={innov} />

          <Radar data={skills} total={get_percent(country.fields["Skills"])} info={sk} />
        </div>
      </div>
      <Footer show={false} />
    </section>
  );
};

export default Country;
