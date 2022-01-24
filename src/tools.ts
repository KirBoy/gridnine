export const getTransfers = (transfers: number) => {
    if (transfers === 1) {
        return 'кa'
    }

    if (transfers > 1 && transfers < 5) {
        return 'ки'
    }

    if (transfers > 1 && transfers < 5) {
        return 'ки'
    }

    if ((transfers > 4 && transfers < 10) || (transfers === 0)) {
        return 'ок'
    }
}

export const getTime = (time: string): number => {
    let spreadTime = time.split(':')
    return +spreadTime[0]*60 + +spreadTime[1]
}


