import React, {FC} from 'react';
import {Airlines, IFilters} from "../types";
import '../App.css'

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
        let transfers: boolean = true

        filters.transfers.forEach(el => {
            transfers = airlineTransfers.some(obj => obj.transfers === el)
        })

        if (airline.price <= filters.price.max && airline.price >= filters.price.min && transfers) {
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
            <h2 className='title'>Сортировать</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'ascending'}
                               onChange={e => onChangeSort(e, 'ascending')}
                        />
                        <span className='filters_sort'>По возрастанию цены</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'descending'}
                               onChange={e => onChangeSort(e, 'descending')}
                        />
                        <span className='filters_sort'>По убыванию цене</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_radio' type="radio" checked={filters.sort === 'time'}
                               onChange={e => onChangeSort(e, 'time')}
                        />
                        <span className='filters_sort'>По времени пути</span>
                    </label>
                </li>
            </ul>
            <h2>Количество пересадок</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_checkbox' type="checkbox"
                               onChange={e => onChangeTransfers(e, 0)}
                               checked={filters.transfers?.some(el => el === 0)}/>
                        <span className='filters_desc'>Без пересадок</span>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <input className='filters_checkbox' type="checkbox"
                               onChange={e => onChangeTransfers(e, 1)}
                               checked={filters.transfers?.some(el => el === 1)}
                        />
                        <span className='filters_desc'>1 пересадка</span>
                    </label>
                </li>
            </ul>
            <h2>Авиакомпании</h2>
            <ul className='filters_list'>
                {airlines?.map((el, i) => <li className='filters_item' key={i}>
                    <label className={disableFilter('label', el.airline)}>
                        <input className='filters_checkbox' type="checkbox"
                               disabled={!!disableFilter('input', el.airline)}
                               checked={filters.airline.some(airlines => airlines === el.airline)}
                               onChange={(e) => onChangeAirlines(e, el.airline)}
                        />
                        <span className='filters_desc'>{el.airline} от {el.price}</span>
                    </label>
                </li>)}

            </ul>
            <h2>Цена</h2>
            <ul className='filters_list'>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <span className='filters_price'>от</span>
                        <input className='filters_input' value={filters.price.min} type="text"
                               onChange={(e) => onChangePrice(e, 'min')}/>
                    </label>
                </li>
                <li className='filters_item'>
                    <label className='filters_label'>
                        <span className='filters_price'>до</span>
                        <input className='filters_input' value={filters.price.max} type="text"
                               onChange={(e) => onChangePrice(e, 'max')}/>
                    </label>
                </li>
            </ul>
        </form>
    );
};

export default Filters;