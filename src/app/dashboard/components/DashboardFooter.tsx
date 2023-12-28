import React from 'react'

const DashboardFooter = () => {
  return (
    <div className='mx-auto p-4 flex flex-col gap-3'>
        <p className='text-muted-foreground tracking-tighter'>&copy; Naijaschools, {new Date().getFullYear()}</p>
    </div>
  )
}

export default DashboardFooter