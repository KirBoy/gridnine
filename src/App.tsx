import React, {useState} from 'react';

import './App.css';
import {FlightProps, AppState, Airlines} from './types'
import Flight from "./components/Flight";
import Filters from "./components/Filters";
import {getTime} from "./tools";

function App() {
    const [flights, setFlights] = useState<FlightProps[]>([])
    const [filters, setFilters] = useState<AppState>({
        airline: [],
        sort: 'ascending',
        price: {max: 10000, min: 0},
        transfers: []
    })
    const [airlines, setAirLines] = useState<Airlines[]>([])

    React.useEffect(() => {
        let resp: FlightProps[] = require('./tickets.json').tickets;
        setFlights(resp.filter((el) => {
            if ((filters.airline.length === 0 || filters.airline.some(airline => airline === el.airline)) &&
                (filters.price.min === null || el.price > filters.price.min) &&
                (filters.price.max === null || el.price < filters.price.max) &&
                (filters.transfers.length === 0 || filters.transfers.some(transfer => transfer === el.transfers))) {
                return el
            }
        }))

        let arrAirLines: Airlines[] = [];

        resp.forEach(el => {
            if (arrAirLines.every(obj => obj.airline !== el.airline)) {
                arrAirLines.push({airline: el.airline, price: el.price})
            }
        })

        arrAirLines.forEach(el => {
            resp.filter(obj => obj.airline === el.airline).forEach(el => {
                if (arrAirLines.filter(obj => obj.airline === el.airline)[0].price > el.price) {
                    arrAirLines[arrAirLines.findIndex(o => o.airline === el.airline)].price = el.price
                }
            })
        })
        setAirLines(arrAirLines)
    }, [filters])

    return (
        <div className="container">
            <Filters filters={filters} setFilters={setFilters} airlines={airlines} flights={flights}/>
            <ul className='flights'>
                {flights.length === 0 && <p>Билеты по данным параметрам не найдены</p>}
                {filters.sort === 'time' && flights.sort((a, b) => getTime(a.trevelTime) - getTime(b.trevelTime)).map((el) =>
                    <Flight key={el.id} flight={el}/>)}
                {filters.sort === 'ascending' && flights.sort((a, b) => a.price - b.price).map((el) => <Flight
                    key={el.id} flight={el}/>)}
                {filters.sort === 'descending' && flights.sort((a, b) => b.price - a.price).map((el) =>
                    <Flight key={el.id} flight={el}/>)}
            </ul>
        </div>
    );
}

export default App;


