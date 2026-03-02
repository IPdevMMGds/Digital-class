import React, { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { generateCalendarRange, yyyymmddConverter, months, monthshort } from "../components/utility/calendarUtils";
import "./MonthlyView.css";
function MonthlyView() {
    const navigate = useNavigate()
    const weeks = generateCalendarRange();
    const today = new Date();
    const BASE_WEEK_HEIGHT = 100;
    const MONTH_HEADER_EXTRA = 30;
    const todayRowRef = useRef(null);
    useEffect(() => {
        if (todayRowRef.current) {
                todayRowRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, []);
    const weekContainsFirstOfMonth = (week) => {
        return week.some(date => date.getDate() === 1);
    };
    return (
        <div className="calendar-container">
            <table className="calendar-table">
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, weekIndex) => {
                        const hasMonthStart = weekContainsFirstOfMonth(week);
                        const calculatedHeight = hasMonthStart ? BASE_WEEK_HEIGHT + MONTH_HEADER_EXTRA : BASE_WEEK_HEIGHT;
                        const weekHasToday = week.some(
                            date => date.toDateString() === today.toDateString()
                        );
                        return(
                            <tr key={weekIndex} style={{ height: `${calculatedHeight}px`}} ref={weekHasToday ? todayRowRef : null}>
                                {week.map((date, dayIndex) => {
                                    const isToday = yyyymmddConverter(date) === yyyymmddConverter(today);
                                    const isPast = yyyymmddConverter(date) < yyyymmddConverter(today);
                                    return(
                                        <td
                                            key={dayIndex}
                                            className={`calendar-cell ${isToday ? "today-cell" : (isPast ? "past-cell" : "")}`}
                                        >
                                            {date.getDate()} {((date.getDate() === 1) || date.toDateString() === today.toDateString()) ? `${monthshort[date.getMonth()]} ${((date.getMonth() === 0) || date.toDateString() === today.toDateString()) ? `${date.getFullYear()}` : ""}` : ""}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default MonthlyView