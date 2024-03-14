import React, { useContext, useState } from "react";
import addIcon from "../assets/Button Small 38 px.png";
import GlobalContext from "../context/GlobalContext";
import moreIcon from "../assets/Vector.png";
import deleteIcon from "../assets/trash.png";
import todoIcon from "../assets/Vector.svg";

export default function ListTasks() {
  const {
    filteredEvents,
    dispatchCalEvent,
    setSelectedEvent,
    setShowEventModal,
  } = useContext(GlobalContext);
  const [switchStageTasks, setSwitchStageTasks] = useState("todo");
  const [selectedTrashId, setSelectedTrashId] = useState(null);

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
    }
    setSelectedTrashId('null');
    dispatchCalEvent({ type: "update", payload: item });
  }
  return (
    <div className="item-list-task">
      <header className="header-list">
        <div className="header-list-title">Simple To Do List</div>
        <div className="header-list-subtitle">
          Today is awesome day. The weather is awesome, you are awesome too!
        </div>
      </header>
      <section className="btns">
        <div className="toggle-btns">
          <button
            onClick={() => setSwitchStageTasks("todo")}
            className={
              switchStageTasks === "todo"
                ? "todo-btn-switch active"
                : "todo-btn-switch"
            }
          >
            To Do
          </button>
          <button
            onClick={() => setSwitchStageTasks("done")}
            className={
              switchStageTasks === "done"
                ? "todo-btn-switch active"
                : "todo-btn-switch"
            }
          >
            Done
          </button>
          <button
            onClick={() => setSwitchStageTasks("trash")}
            className={
              switchStageTasks === "trash"
                ? "todo-btn-switch active"
                : "todo-btn-switch"
            }
          >
            Trash
          </button>
        </div>
        <button onClick={() => setShowEventModal(true)} className="add-task">
          <img src={addIcon} alt="" />
        </button>
      </section>
      <main className="switch-items">
        <p className="switch-main-text">
          {switchStageTasks === "todo"
            ? "To Do"
            : switchStageTasks === "done"
            ? "Done"
            : "Trash"}
        </p>
        <div className="switch-main-border"></div>
        {switchStageTasks === "todo" &&
          filteredEvents.map((item, idx) => {
            if (!item.done && !item.trash) {
              return (
                <div
                  className="flex"
                  key={item.id}
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      backgroundColor: `${
                        selectedTrashId === item.id ? "#e4e6e7" : ""
                      }`,
                    }}
                    className="more"
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
                      <div
                        className="moveToTrash"
                        onClick={() => toggleTaskDone("trash", item)}
                      >
                        <img className="trashIcon" src={deleteIcon} />
                        <span>Move to Trash</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
        {switchStageTasks === "done" &&
          filteredEvents.map((item, idx) => {
            if (item.done && !item.trash) {
              return (
                <div
                  className="flex"
                  key={item.id}
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      backgroundColor: `${
                        selectedTrashId === item.id ? "#e4e6e7" : ""
                      }`,
                    }}
                    className="more"
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
                      <div
                        className="moveToTrash"
                        onClick={() => toggleTaskDone("trash", item)}
                      >
                        <img className="trashIcon" src={deleteIcon} />
                        <span>Move to Trash</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
        {switchStageTasks === "trash" &&
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
      </main>
      <footer className="switch-footer">
        <p className="footer-text">Made with ❤️ at nFactorial in 2022.</p>
        <p className="footer-link">
          Credits: icons from <a href="https://icons8.com/">Icons8.</a>
        </p>
      </footer>
    </div>
  );
}
