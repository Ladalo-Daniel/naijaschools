import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { User } from 'lucide-react'
import React from 'react'

const AdminComponent = () => {
  return (
    <div className='flex flex-wrap gap-4'>
        <Card>
            <CardHeader className='flex items-center'>
                <User />
                <h2>Students</h2>
            </CardHeader>
            <CardBody>
                2
            </CardBody>
        </Card>
    </div>
  )
}

export default AdminComponent