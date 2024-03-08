import './App.css';
import React,{useState,useContext, useEffect} from 'react';
import {getMonth} from './util'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import GlobalContext from './context/GlobalContext';
import ModalList from './components/ModalList';
import ListTasks from './components/ListTasks';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex, showEventModal, showModalList,switchWindow,setSwitchWindow} = useContext(GlobalContext);
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex]);
  return (
    
    <React.Fragment>
      {showEventModal && <EventModal/>}
      {showModalList && <ModalList/>}
      <div className='h-screen flex flex-col'>
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          {console.log(switchWindow)}
          {switchWindow==='calendar' ? <Month month = {currentMonth}/> : switchWindow==='list'?<ListTasks/>:'wrong'}
          
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
