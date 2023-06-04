import { useQuery } from "react-query";
import { CasesWithDate, CountrySpecificData, WorldWideData } from "../interfaces";
import axios from "axios";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";

const Maps = () => {
  return (
    <div className='flex flex-col items-center justify-start gap-10 w-full h-full p-4 md:p-20'>
      <h1 className='text-green-950 font-semibold text-5xl'>Maps Page</h1>
      <WorldWideMap />
      <CountrySpecificMap />
      <DateSpecificMap />
    </div>
  )
}

const DateSpecificMap = () => {
  const { data, isLoading } = useQuery('dateSpecificData', async () => {
    const res = await axios.get<CasesWithDate>('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
    return res.data
  })
  const [zoomScale, setZoomScale] = useState(200)

  const dataOrganised = data ? Object.entries(data.cases).map(([date, cases]) => ({ date, cases })) : []

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <h1 className='text-green-900 font-semibold text-xl py-4'>Date Specific Map</h1>
      {isLoading ?
        <h1 className='text-green-900 font-semibold text-xl py-4'>Loading...</h1>
        : data && (
          <div className="w-full overflow-x-auto flex flex-col items-center">
            <LineChart width={600} height={300} data={dataOrganised.splice(0, zoomScale)}>
              <Line type="linear" dataKey="cases" stroke="#cc9110" />
              <CartesianGrid stroke="#052e16" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis label="Cases" tick={false} />
              <Tooltip />
            </LineChart>
            <div className="flex gap-10 items-center p-2">
              <button className="text-white text-base font-semibold bg-blue-400 py-2 px-4 rounded-full" onClick={() => setZoomScale(prev => prev > 0 ? prev - 50 : 50)}>Zoom In</button>
              <button className="text-white text-base font-semibold bg-blue-400 py-2 px-4 rounded-full" onClick={() => setZoomScale(prev => dataOrganised.length > prev ? prev + 50 : prev)}>Zoom Out</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const CountrySpecificMap = () => {
  const { data, isLoading } = useQuery('countrySpecificData', async () => {
    const res = await axios.get<CountrySpecificData[]>('https://disease.sh/v3/covid-19/countries')
    return res.data
  })

  const [zoomScale, setZoomScale] = useState(10)

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <h1 className='text-green-900 font-semibold text-xl py-4'>Country Specific Map</h1>
      {isLoading ?
        <h1 className='text-green-900 font-semibold text-xl py-4'>Loading...</h1>
        : data && (
          <div className="w-full overflow-x-auto flex flex-col items-center">
            <LineChart width={600} height={300} data={data.splice(0, zoomScale)}>
              <Line type="monotone" dataKey="cases" stroke="#7e2af5" />
              <Line type="monotone" dataKey="deaths" stroke="#eb4034" />
              <Line type="monotone" dataKey="recovered" stroke="#29b4ff" />
              <CartesianGrid stroke="#1f9952" strokeDasharray="5 5" />
              <XAxis dataKey="country" />
              <YAxis label="Cases" tick={false} />
              <Tooltip />
            </LineChart>
            <div className="flex gap-10 items-center p-2">
              <button className="text-white text-base font-semibold bg-blue-400 py-2 px-4 rounded-full" onClick={() => setZoomScale(prev => prev > 0 ? prev - 10 : 10)}>Zoom In</button>
              <button className="text-white text-base font-semibold bg-blue-400 py-2 px-4 rounded-full" onClick={() => setZoomScale(prev => data?.length as number > prev ? prev + 10 : prev)}>Zoom Out</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const WorldWideMap = () => {
  const { data, isLoading } = useQuery('worldWideData', async () => {
    const res = await axios.get<WorldWideData>('https://disease.sh/v3/covid-19/all')
    return res.data
  })
  return (
    <div className='flex flex-col items-center w-full h-full'>
      <h1 className='text-green-900 font-semibold text-xl py-4'>World Wide Map</h1>
      {isLoading ?
        <h1 className='text-green-900 font-semibold text-xl py-4'>Loading...</h1>
        : data && (
          <div className="mt-4">
            <h1 className='text-green-800 font-normal text-xl'>Total Cases: {data.cases}</h1>
            <h1 className='text-green-800 font-normal text-xl'>Total Deaths: {data.deaths}</h1>
            <h1 className='text-green-800 font-normal text-xl'>Total Recovered: {data.recovered}</h1>
          </div>
        )
      }
    </div>
  )
}

export default Maps
