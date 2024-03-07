import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import GlobalContext from "../context/GlobalContext";
export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex,setSmallCalendarMonth, daySelected, setDaySelected } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format)
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if(currDay === slcDay){
      return "bg-blue-100 rounded-full text-blue-600 font-bold"
    }
    return "";

  }
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="flex">
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgb(229 231 235/ 1",
            }}
            onClick={handlePrevMonth}
          >
            <span
              className="material-icons-outlined cursor-pointer"
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={leftArrow}
                alt=""
                style={{ width: "30%", height: "30%" }}
              />
            </span>
          </button>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgb(229 231 235 / 1)",
            }}
            onClick={handleNextMonth}
          >
            <span
              className="material-icons-outlined cursor-pointer"
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={rightArrow}
                alt=""
                style={{ width: "30%", height: "30%" }}
              />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button onClick={()=>{
                setSmallCalendarMonth(currentMonthIdx);
                setDaySelected(day);
              }} key={idx} className={`py-1 w-full ${getDayClass(day)}`}>
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
