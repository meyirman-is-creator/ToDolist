import React, { useContext, useState } from "react";
import logo from "../assets/calendar.png";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex,switchWindow,setSwitchWindow } = useContext(GlobalContext);
  
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? dayjs().month() + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center " style={{borderBottom:"1px solid #cdcdcd"}}>
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-grey-500 font-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
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
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={leftArrow} alt="" style={{ width: "30%", height: "30%" }} />
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
            width: "50px",
            height: "50px",
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
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <div className="toggle-stage flex" style={{marginLeft:'20px', gap:"20px"}}>
        <div onClick={()=>setSwitchWindow('calendar')} className="cursor-pointer toggle-calendar" style={{textAlign:'center',border:`2px solid ${switchWindow==='calendar'?'blue':'gray'}`, width:'100px',padding:'10px 0'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style={{margin:'0 auto'}}
            fill={switchWindow==='calendar'?'blue':'gray'}

          >
            <path d="M19,2h-1V1c0-.55-.45-1-1-1s-1,.45-1,1v1H8V1c0-.55-.45-1-1-1s-1,.45-1,1v1h-1C2.24,2,0,4.24,0,7v12c0,2.76,2.24,5,5,5h14c2.76,0,5-2.24,5-5V7c0-2.76-2.24-5-5-5Zm-8,7v3h-3v-3h3Zm5,0v3h-3v-3h3Zm6,0v3h-4v-3h4ZM6,12H2v-3H6v3Zm-4,2H6v3H2v-3Zm6,0h3v3h-3v-3Zm3,5v3h-3v-3h3Zm2,0h3v3h-3v-3Zm0-2v-3h3v3h-3Zm5-3h4v3h-4v-3ZM5,4h14c1.65,0,3,1.35,3,3H2c0-1.65,1.35-3,3-3Zm-3,15H6v3h-1c-1.65,0-3-1.35-3-3Zm17,3h-1v-3h4c0,1.65-1.35,3-3,3Z" />
          </svg>
          <span style={{color:`${switchWindow==='calendar'?'blue':'gray'}`}}>Calendar</span>
        </div>
        <div onClick={()=>setSwitchWindow('list')} className="toggle-list cursor-pointer" style={{textAlign:'center',border:`2px solid ${switchWindow==='list'?'blue':'gray'}`, width:'100px',padding:'10px 0'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="24"
            style={{margin:'0 auto'}}
            height="24"
            fill={switchWindow==='list'?'blue':'gray'}
          >
            <path d="m19,1H5C2.243,1,0,3.243,0,6v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V6c0-2.757-2.243-5-5-5Zm3,17c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V6c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v12Zm-3-11c0,.552-.448,1-1,1h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1Zm-11,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm11,5c0,.552-.448,1-1,1h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1Zm-11,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm11,5c0,.552-.448,1-1,1h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1Zm-11,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Z" />
          </svg>
          <span style={{color:`${switchWindow==='list'?'blue':'gray'}`}}>List</span>
        </div>
      </div>
    </header>
  );
}
