import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import arrow from "../assets/angle-small-down.svg";
import moreIcon from "../assets/Vector.png";
import "../style/label.css";
import deleteIcon from "../assets/trash.png";
import todoIcon from "../assets/Vector.svg";

export default function Labels() {
  const { labels, updateLabel, filteredEvents, dispatchCalEvent } =
    useContext(GlobalContext);
  const [selectedTrashId, setSelectedTrashId] = useState(null);
  const [showTrashes, setShowTrashes] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const openTrashModal = (item) => {
    setSelectedTrashId((prev) => (prev === item.id ? "null" : item.id));
  };
  function toggleTaskDone(type, task) {
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
    } else if (type === "todo") {
      item.done = task.done;
      item.trash = !task.trash;
    }
    dispatchCalEvent({ type: "update", payload: item });
  }
  function getString(lbl){
    let indexOf = lbl.indexOf('-')+1;
    let lastIndexOf = lbl.lastIndexOf('-');
    return lbl.slice(indexOf,lastIndexOf).toUpperCase();
  }
  return (
    <React.Fragment>
      <div className="todo">
        <p
          className="todo-title mb-3 text-gray-500 font-bold mt-5 hover:bg-gray-200 rounded-sm"
          style={{ padding: "0 5px" }}
          onClick={() => setShowCategory((prev) => !prev)}
        >
          <span>Category</span>
          <img
            style={{
              transform: `${showCategory ? "rotate(180deg)" : "rotate(0deg)"}`,
              transition: "all .5s",
              width: "20px",
              height: "20px",
            }}
            src={arrow}
            alt=""
          />
        </p>
        <div
          className="category-items"
          style={{
            background: "white",
            border: "3px solid #f6f6f6",
            padding: "5px",
          }}
        >
          {showCategory &&
            labels.map(({ label: lbl, checked }, idx) => (
              <div className="flex">
                <label className="custom-checkbox">
                  <input
                    onChange={() => {
                      updateLabel({ label: lbl, checked: !checked });
                    }}
                    type="checkbox"
                    checked={checked}
                    hidden
                  />
                  <span className="checkmark"></span>
                </label>
                <div
                  style={{
                    width: "100%",
                  }}
                  className={`labelTask p-1 text-white text-sm rounded mb-1 ml-1.5 truncate ${lbl}`}
                >
                  {getString(lbl)}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="trash ">
        <p
          onClick={() => setShowTrashes((prev) => !prev)}
          className="cursor-pointer trash-title text-gray-500 font-bold mt-5 mb-3 hover:bg-gray-200 rounded-sm"
          style={{ padding: "0 5px" }}
        >
          <span>Trash</span>
          <img
            style={{
              transform: `${showTrashes ? "rotate(180deg)" : "rotate(0deg)"}`,
              transition: "all .5s",
              width: "20px",
              height: "20px",
            }}
            src={arrow}
            alt=""
          />
        </p>
        <div
          className="trashes-item "
          style={{
            maxHeight: "200px",
            overflowY: "scroll",
            background: "white",
            border: "3px solid #f6f6f6",
            padding: "5px",
          }}
        >
          {showTrashes &&
            filteredEvents.map((item, idx) => {
              if (item.trash) {
                return (
                  <div
                    className="flex"
                    key={idx}
                    style={{ position: "relative" }}
                  >
                    <div
                      className="more"
                      style={{
                        backgroundColor: `${
                          selectedTrashId === item.id ? "#e4e6e7" : ""
                        }`,
                      }}
                      onClick={() => openTrashModal(item)}
                    >
                      <img src={moreIcon} />
                    </div>
                    <label className="custom-checkbox">
                      <input
                        onChange={() => toggleTaskDone("done", item)}
                        type="checkbox"
                        checked={item.done}
                        hidden
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div
                      style={{
                        width: "100%",
                        textDecoration: `${item.done ? "line-through" : ""}`,
                      }}
                      className={`labelTask p-1 text-white text-sm rounded mb-1 ml-1.5 truncate ${item.selectedLabel}`}
                    >
                      {item.title}
                    </div>
                    {selectedTrashId === item.id && (
                      <div className="moves">
                        <div
                          className="moveToTrash"
                          onClick={() =>
                            dispatchCalEvent({ type: "delete", payload: item })
                          }
                        >
                          <img className="trashIcon" src={deleteIcon} />
                          <span>Delete Forever</span>
                        </div>
                        <div
                          className="backToTODO"
                          onClick={() => toggleTaskDone("todo", item)}
                        >
                          <img className="todoIcon" src={todoIcon} />
                          <span>Move Back To To Do</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </React.Fragment>
  );
}
