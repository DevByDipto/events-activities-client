import { Footer } from '@/components/shared/Footer'
import PublicNavbar from '@/components/shared/PublicNavbar'
import React, { ReactNode } from 'react'

const Commonlayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <PublicNavbar/>
        {children}
        <Footer/>
        </div>
  )
}

export default Commonlayout