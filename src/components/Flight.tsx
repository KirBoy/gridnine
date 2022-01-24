import React, {FC} from 'react';
import {FlightType} from '../types'
import '../App.css';
import {getTransfers} from "../tools";

const Flight: FC<FlightType> = ({flight}) => {
    return (
        <li className='flight'>
            <div>
                <h2 className='flight_company'>{flight.airline}</h2>
                <span> {flight.price} ₽</span>
            </div>
            <ul className='flight_list'>
                <li>
                    <time className='flight_time'>{flight.fromTime}</time>
                    <h4>{flight.fromCity}</h4>
                    <time>{flight.fromDate}</time>
                </li>
                <li className='flight_transfers'>
                    <span>
                        {flight.transfers} пересад{getTransfers(flight.transfers)}
                    </span>
                    <span> время в пути    {flight.trevelTime}</span>
                </li>
                <li>
                    <time className='flight_time'>{flight.toTime}</time>
                    <h4>{flight.toCity}</h4>
                    <time>{flight.toDate}</time>
                </li>
            </ul>
        </li>
    );
};

export default Flight;