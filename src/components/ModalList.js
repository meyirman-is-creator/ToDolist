import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import closeIcon from "../assets/circle-xmark.png";
import moreIcon from "../assets/Vector.png";
import "../style/modallist.css";
import deleteIcon from "../assets/trash.png";

export default function ModalList() {
  const {
    daySelected,
    filteredEvents,
    setShowModalList,
    setSelectedEvent,
    setShowEventModal,
    dispatchCalEvent,
  } = useContext(GlobalContext);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [selectedTrashId, setSelectedTrashId] = useState(null);

  function toggleTaskDone(task){
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
  const openTrashModal = (item) => {
    setSelectedTrashId((prev) => (prev === item.id ? "null" : item.id));
  };

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
    zIndex:'1',
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
  const closeModal = (e) => {
    e.preventDefault();
    setShowModalList(false);
    setSelectedEvent(null);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={modalStyle}
      className="h-screen fixed w-full left-0 top-0 flex justify-center items-center"
    >
      <div
        onMouseDown={onMouseDown}
        className="bg-white rounded-lg shadow-2xl w-1/4"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          {daySelected.format("DD MMMM")}
          <button onClick={(e) => closeModal(e)}>
            <img
              src={closeIcon}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </header>
        <div
          className="p-3"
          style={{ maxHeight: "280px", overflowY: "scroll" }}
        >
          <div className="items-end gap-y-7">
            {filteredEvents.map((item) => {
              if (
                item.day === daySelected.format("YYYY-MM-DD") &&
                !item.trash
              ) {
                return (
                  <div
                    className="flex"
                    key={item.id}
                    style={{ position: "relative" }}
                  >
                    <div className="more" onClick={() => openTrashModal(item)}>
                      <img src={moreIcon} />
                    </div>
                    <label className="custom-checkbox">
                      <input
                        onChange={() => toggleTaskDone(item)}
                        type="checkbox"
                        checked={item.done}
                        hidden
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div
                      onClick={() => {
                        setSelectedEvent(item);
                        setShowEventModal(true);
                      }}
                      style={{
                        width: "100%",
                        textDecoration: `${item.done ? "line-through" : ""}`,
                      }}
                      className={`labelTask p-1 text-white text-sm rounded mb-1 mr-3 ml-3 truncate ${item.selectedLabel}`}
                    >
                      {item.title}
                    </div>
                    {selectedTrashId === item.id && (
                      <div className="moves">
                        <div className="moveToTrash">
                          <img className="trashIcon" src={deleteIcon} />
                          <span>Move to Trash</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
