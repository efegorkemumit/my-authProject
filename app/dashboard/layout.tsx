import React from 'react'

interface DashboardLayoutProps{
    children: React.ReactNode
}

const layout = ({children} : DashboardLayoutProps) => {
  return (
    <div>layout

        {children}
    </div>
  )
}

export default layout