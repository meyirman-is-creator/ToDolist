import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import deleteIcon from "../assets/trash.svg";

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
  function countTasks(array){
    let count = 0;
    array.map(item=>{
      if(!item.trash) count++;
    });
    return count;
  }

  function toggleTaskDone(e,type, task) {
    e.stopPropagation();
    setShowEventModal(false);
    const item = {
      title: task.title,
      description: task.description,
      selectedLabel: task.selectedLabel,
      day: task.day,
      id: task.id,
    };
    if (type === "done") {
      item.done = !task.done;
      item.trash = task.trash;
    } else if (type === "trash") {
      item.done = task.done;
      item.trash = !task.trash;
    }
    dispatchCalEvent({ type: "update", payload: item });
  }
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
  let count=0;
  return (
    <div
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
      className=" flex flex-col cursor-pointer"
      style={{border:'1px solid #cdcdcd'}}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {dayEvents.map((evt, idx) => {
          if (count < 3 && !evt.trash) {
            count++;
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
                  className={`flex justify-between mr-1 p-1 ml-3 text-white text-sm rounded mb-1 truncate ${evt.selectedLabel}`}
                >
                  {evt.title}
                  <img
                    onClick={(e) => {
                      toggleTaskDone(e,'trash',evt)
                    }}
                    className="mr-2"
                    src={deleteIcon}
                    alt=""
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <label className="custom-checkbox mr-3">
                  <input
                    onChange={(e) => toggleTaskDone(e,"done", evt)}
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
        {countTasks(dayEvents)> 3 &&  (
          <div
            className="text-black p-1  mr-3 ml-3 text-sm rounded mb-1 truncate bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setDaySelected(day);
              setShowModalList(true);
            }}
          >
            more {countTasks(dayEvents) - 3}
          </div>
        )}
      </div>
    </div>
  );
}
