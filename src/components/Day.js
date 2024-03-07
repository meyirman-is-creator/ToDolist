import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    selectedEvent,
    showModalList,
    setShowModalList,
    dispatchCalEvent,
  } = useContext(GlobalContext);
  function toggleTaskDone(task){
    setShowEventModal(false);
    const item = {
      title: task.title,
      description: task.description,
      selectedLabel: task.selectedLabel,
      day: task.day,
      id: task.id,
      done: !task.done,
      trash: task.trash,
    };
    dispatchCalEvent({ type: "update", payload: item });
  };
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-while rounded-full w-7 text-white"
      : "";
  }

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);
  return (
    <div
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
      className="border border-gray-200 flex flex-col cursor-pointer"
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {dayEvents.map((evt, idx) => {
          if (idx < 3) {
            return (
              <div className="flex">
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedEvent(evt);
                  }}
                  style={{
                    width: "100%",
                    textDecoration: `${evt.done ? "line-through" : ""}`,
                  }}
                  className={`mr-1 p-1 ml-3 text-white text-sm rounded mb-1 truncate ${evt.selectedLabel}`}
                >
                  {evt.title}
                </div>
                <label className="custom-checkbox mr-3">
                  <input
                    onChange={(e) => toggleTaskDone(evt)}
                    type="checkbox"
                    checked={evt.done}
                    hidden
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            );
          }
        })}
        {dayEvents.length > 3 && (
          <div
            className="text-black p-1  mr-3 ml-3 text-sm rounded mb-1 truncate bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setDaySelected(day);
              setShowModalList(true);
            }}
          >
            more {dayEvents.length - 3}
          </div>
        )}
      </div>
    </div>
  );
}
