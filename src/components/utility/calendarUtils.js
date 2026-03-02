export function getToday() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}
export function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}
export function getPreviousSunday(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    newDate.setDate(newDate.getDate() - day);
    return newDate;
}
export function getNextSaturday(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = 6 - day;
    newDate.setDate(newDate.getDate() + diff);
    return newDate;
}
export function generateCalendarRange() {
    const today = getToday();
    const startDateRaw = addMonths(today, -18);
    const endDateRaw = addMonths(today, 18);
    const startDate = getPreviousSunday(startDateRaw);
    const endDate = getNextSaturday(endDateRaw);
    const weeks = [];
    let current = new Date(startDate);
    while (current <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
    }
    return weeks;
}
export function yyyymmddConverter(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const yyyymmddString = `${year}${month}${day}`;
    return parseInt(yyyymmddString, 10);
};
export const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
export const monthshort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
 const getCellHeight = (date) => {
    let base = 100;
    if (date.getDate() === 1) {
        base += 30;
    }
    return base;
};