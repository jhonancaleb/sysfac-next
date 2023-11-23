import React from 'react'
import Header from '@/features/Header'
import MenuBar from '@/features/MenuBar'
import { Card, CardBody } from '@nextui-org/card'

type Props = {
  children: React.ReactNode
}

function PanelLayout ({ children }: Props) {
  return (
    <div className='w-full max-h-screen overflow-hidden flex-1 flex gap-5 p-3'>
      <div className='w-[min(20%,300px)]'>
        <MenuBar />
      </div>
      <div className='flex-1 flex flex-col gap-5 overflow-auto'>
        <Header />
        <Card as='main' className='flex flex-1 overflow-visible'>
          <CardBody className='flex-1 p-5'>{children}</CardBody>
        </Card>
      </div>
    </div>
  )
}
export default PanelLayout
