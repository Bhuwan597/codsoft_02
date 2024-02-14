import React from 'react'
import Sidebar from './Sidebar'
import AllUsers from './AllUsers'
import Navbar from './Navbar'

const DashboardLayout = ({children}) => {
  return (
   <>
          <div className="flex items-start w-full">
        <div className="w-2/5 md:w-1/5 border-r  border-slate-400 sticky top-0">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <Navbar />
          {children}
        </div>
        <div className="w-2/5 md:w-1/5 border-l border-slate-400 sticky top-0">
          <AllUsers />
        </div>
      </div>
   </>
  )
}

export default DashboardLayout