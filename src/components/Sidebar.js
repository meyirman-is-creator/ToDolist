import React, { useEffect, useState } from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import Labels from './Labels'
export default function Sidebar() {
  
  return (
    <aside className='p-5 w-64' style={{borderRight:'1px solid #cdcdcd',borderTop:'1px solid #cdcdcd'}}>
      <CreateEventButton/>
      <SmallCalendar/>
      <Labels/>
    </aside>
  )
}
