import React, { useContext, useState, useRef } from "react";
import GlobalContext from "../context/GlobalContext";
import burgerIcon from "../assets/menu-burger.png";
import closeIcon from "../assets/circle-xmark.png";
import schedule from "../assets/schedule.png";
import dayjs from "dayjs";
import check from "../assets/check.svg";
import bookmark from "../assets/bookmark.png";
import segment from "../assets/description-alt.png";
import deleteIcon from "../assets/trash.png";
import "../style/eventmodal.css";
const labelClasses = [
  "bg-indigo-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-purple-500",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.selectedLabel : labelClasses[0]
  );
  const [selectedDate, setSelectedDate] = useState(
    daySelected.format("YYYY-MM-DD")
  );
  const dateInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };
  const modalStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex:'1'
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      const newPos = {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      };
      setPosition(newPos);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title: title,
      description: description,
      selectedLabel: selectedLabel,
      day: selectedDate,
      id: selectedEvent ? selectedEvent.id : Date.now(),
      done: false,
      trash: false,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  }
  const closeModal = (e) => {
    e.preventDefault();
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <div
      style={modalStyle}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"
    >
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header onMouseDown={onMouseDown}  className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            <img
              src={burgerIcon}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </span>
          <div className="flex">
            {selectedEvent && (
              <img
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
                className="mr-2"
                src={deleteIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            )}
            <button onClick={(e) => closeModal(e)}>
              <img
                src={closeIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </header>
        <div
          className="p-3"
          style={{ maxHeight: "280px", overflowY: "scroll" }}
        >
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <img
              src={schedule}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <input
              ref={dateInputRef}
              type="date"
              onClick={(e) => e.target.showPicker()}
              onFocus={(e) => e.target.showPicker()}
              value={selectedDate}
              onChange={handleChange}
            />

            <img
              src={segment}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />

            <textarea
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 resize-none overflow-hidden"
              onChange={(e) => {
                setDescription(e.target.value);
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              style={{
                height: "auto",
                backgroundColor: "rgb(241, 243, 244)",
                padding: "8px",
                overflowX: "hidden",
              }}
            />
            <img
              src={bookmark}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <div className="flex gap-x-2">
              {labelClasses.map((lblClasses, i) => (
                <span
                  key={i}
                  className={`${lblClasses} w-6 rounded-full h-6 flex items-center justify-center cursor-pointer`}
                  onClick={() => {
                    setSelectedLabel(lblClasses);
                  }}
                >
                  {selectedLabel === lblClasses && (
                    <img
                      src={check}
                      alt=""
                      style={{ width: "12px", height: "12px" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer onMouseDown={onMouseDown}  className="flex justify-end border-t p-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
