import {Dispatch, SetStateAction} from "react";

export type FlightProps = {
    trevelTime: string;
    airline: string;
    id: number;
    fromCity: string;
    fromTime: string;
    fromDate: string
    toCity: string;
    toTime: string;
    toDate: string;
    transfers: number;
    price: number;
}

export type FlightType = {
    flight: FlightProps
}

export type AppState = {
    sort: string | null;
    transfers: number[];
    price: {
        min: number;
        max: number;
    }
    airline: string[];
}

export type IFilters = {
    flights: FlightProps[]
    filters: AppState;
    airlines: Airlines[]
    setFilters: Dispatch<SetStateAction<AppState>>;
}

export type Airlines = {
    airline: string;
    price: number;
}

