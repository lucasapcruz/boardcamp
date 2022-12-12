import dayjs from "dayjs";

export const dateFormat = "YYYY-MM-DD";

export function daysToSeconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

export function millsToDays(mills){
    const result = Math.floor((((mills/1000)/60)/60)/24)
    return result
}


export function formatDate(dateTimeMills) {
    const formattedDate = dayjs(dateTimeMills).format(dateFormat)
    return formattedDate;
}