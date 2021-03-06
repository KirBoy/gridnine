import React, {FC} from 'react';
import {Airlines, IFilters} from "../types";
import '../App.css'
import {log} from "util";

const Filters: FC<IFilters> = ({filters, airlines, setFilters, flights}) => {

    const onChangeTransfers = (e: React.ChangeEvent<HTMLInputElement>, transfers: number) => {

        if (e.target.checked) {
            setFilters((prevState) => ({
                ...prevState,
                transfers: [...prevState.transfers, transfers]
            }));
        } else {
            setFilters((prevState) => ({
                ...prevState,
                transfers: prevState.transfers.filter(el => el !== transfers)
            }));
        }
    }

    const onChangeAirlines = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFilters((prevState) => {
            if (!e.target.checked) {
                return {
                    ...prevState,
                    airline: prevState.airline.filter(airlines => airlines !== value)
                }
            } else {
                return {
                    ...prevState,
                    airline: [...prevState.airline, value]
                }
            }
        });
    }

    const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>, status: string) => {
        setFilters((prevState) => ({
            ...prevState,
            price: {...prevState.price, [status]: +e.target.value}
        }));
    }

    const onChangeSort = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        setFilters((prevState) => ({
            ...prevState,
            sort: type
        }));
    }

    const disableFilter = (type: string, airlineName: string) => {

        const airline: Airlines = airlines.filter(el => el.airline === airlineName)[0]
        const airlineTransfers = flights.filter(el => el.airline === airlineName)
        let transfers: boolean[] = []

        filters.transfers.forEach(el => {
            transfers.push(airlineTransfers.some(obj => obj.transfers === el))
        })
        console.log(airline.price <= filters.price.max && airline.price >= filters.price.min, transfers, airlineName)
        if (airline.price <= filters.price.max && airline.price >= filters.price.min && (transfers.length === 0|| transfers.some(el => el === true))) {
            if (type === 'label') {
                return 'filters_label'
            }

            if (type === 'input') {
                return ''
            }
        }

        if (type === 'label') {
            return 'filters_label filters_label--disabled'
        }

        if (type === 'input') {
            return ' '
        }
    }

    return (
        <form className='filters'>
            <h2 className='title'>??????????????????????</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'ascending'}
                               onChange={e => onChangeSort(e, 'ascending')}
                        />
                        <span className='filters_sort'>???? ?????????????????????? ????????</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'descending'}
                               onChange={e => onChangeSort(e, 'descending')}
                        />
                        <span className='filters_sort'>???? ???????????????? ????????</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'time'}
                               onChange={e => onChangeSort(e, 'time')}
                        />
                        <span className='filters_sort'>???? ?????????????? ????????</span>
                    </label>
                </li>
            </ul>
            <h2>???????????????????? ??????????????????</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_checkbox' type="checkbox"
                               onChange={e => onChangeTransfers(e, 0)}
                               checked={filters.transfers?.some(el => el === 0)}/>
                        <span className='filters_desc'>?????? ??????????????????</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_checkbox' type="checkbox"
                               onChange={e => onChangeTransfers(e, 1)}
                               checked={filters.transfers?.some(el => el === 1)}
                        />
                        <span className='filters_desc'>1 ??????????????????</span>
                    </label>
                </li>
            </ul>
            <h2>????????????????????????</h2>
            <ul className='filters_list'>
                {airlines?.map((el, i) => <li className='filters_item' key={i}>
                    <label className={disableFilter('label', el.airline)}>
                        <input className='filters_checkbox' type="checkbox"
                               disabled={!!disableFilter('input', el.airline)}
                               checked={filters.airline.some(airlines => airlines === el.airline)}
                               onChange={(e) => onChangeAirlines(e, el.airline)}
                        />
                        <span className='filters_desc'>{el.airline} ???? {el.price}</span>
                    </label>
                </li>)}

            </ul>
            <h2>????????</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <span className='filters_price'>????</span>
                        <input className='filters_input' value={filters.price.min} type="text"
                               onChange={(e) => onChangePrice(e, 'min')}/>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <span className='filters_price'>????</span>
                        <input className='filters_input' value={filters.price.max} type="text"
                               onChange={(e) => onChangePrice(e, 'max')}/>
                    </label>
                </li>
            </ul>
        </form>
    );
};

export default Filters;