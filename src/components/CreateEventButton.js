import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <button onClick={()=>setShowEventModal(true)} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
      <span style={{ fontSize: "18px", lineHeight: "18px", fontWeight: "700" }}>
        + Create
      </span>
    </button>
  );
}
