import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { LucideEye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import AdminStudentDetailView from '../students/components/AdminStudentDetailView'
import { UserList, getProfile } from '@/supabase/user'


const TableList = async ({ table, role }: { table: UserList, role?: "students" | "teachers" }) => {
    const profile = await getProfile()
  return (
    <div className='w-auto overflow-auto'>
        <Table className='py-5 w-[90%] overflow-scroll'>
            <TableCaption>End of list. You&#39;re all caught up.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">S/N</TableHead>
                    <TableHead className='w-20'>Profile_Picture</TableHead>
                    <TableHead >FullName</TableHead>
                    <TableHead >Username</TableHead>
                    <TableHead >Email</TableHead>
                    <TableHead >Institution</TableHead>
                    <TableHead >CommunityID</TableHead>
                    <TableHead >Age Range</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {table?.map((row, index) => (
                <TableRow key={index} className='py-5'>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell className='w-20'>
                        <Image 
                            quality={100}
                            alt={row?.username!}
                            src={row.image_url || '/icons/profile-placeholder.svg'}
                            width={300}
                            height={300}
                            className='w-12 h-12 max-w-xs:h-8 max-w-xs:w-8 object-cover rounded-full'
                        />
                    </TableCell>
                    <TableCell >{row.first_name || "-"} {row.last_name || "-"}</TableCell>
                    <TableCell >{row.username || "-"}</TableCell>
                    <TableCell >{row.email!}</TableCell>
                    <TableCell >{row.institution || '-'}</TableCell>
                    <TableCell >{row.community_id!}</TableCell>
                    <TableCell >{row?.dob!}</TableCell>
                    <TableCell >
                        
                        {profile?.data?.role === "admin" && <Link href={`/dashboard/${role}?id=${row?.id}`}>
                            <LucideEye size={20} color='dodgerblue' />
                        </Link>}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        {profile?.data?.role === "admin" &&
            <AdminStudentDetailView />
        }
        {/** TODO: Pagination */}
    </div>
  )
}

export default TableList

