import PublicNavbar from '@/components/shared/PublicNavbar'
import React, { ReactNode } from 'react'

const Commonlayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <PublicNavbar/>
        {children}
        
        </div>
  )
}

export default Commonlayout