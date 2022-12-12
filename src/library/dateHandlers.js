import dayjs from "dayjs";

export const dateFormat = "YYYY-MM-DD";

export function daysToSeconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

export function formatDate(dateTimeMills) {
    const formattedDate = dayjs(dateTimeMills).format(dateFormat)
    return formattedDate;
}