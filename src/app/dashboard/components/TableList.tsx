import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StudentList } from '@/supabase/students'
import { format } from 'date-fns'
import { LucideEye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import AdminStudentDetailView from '../students/AdminStudentDetailView'
import { getProfile } from '@/supabase/user'
  

const StudentsList = async ({ students }: { students: StudentList}) => {
    const profile = await getProfile()
  return (
    <div className='w-auto overflow-auto'>
        <Table className='py-5 w-[90%] overflow-scroll'>
            <TableCaption>End of list. You&#39;re all caught up.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">S/N</TableHead>
                    <TableHead className='w-20'>Image</TableHead>
                    <TableHead >FullName</TableHead>
                    <TableHead >Username</TableHead>
                    <TableHead >Email</TableHead>
                    <TableHead >Institution</TableHead>
                    <TableHead >CommunityID</TableHead>
                    <TableHead >DOB</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students?.map((student, index) => (
                <TableRow key={index} className='py-5'>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell className='w-20'>
                        <Image 
                            quality={100}
                            alt={student?.username!}
                            src={student.image_url || '/icons/profile-placeholder.svg'}
                            width={300}
                            height={300}
                            className='w-12 h-12 max-w-xs:h-8 max-w-xs:w-8 object-cover rounded-full'
                        />
                    </TableCell>
                    <TableCell >{student.first_name || "-"} {student.last_name || "-"}</TableCell>
                    <TableCell >{student.username || "-"}</TableCell>
                    <TableCell >{student.email!}</TableCell>
                    <TableCell >{student.institution || '-'}</TableCell>
                    <TableCell >{student.community_id!}</TableCell>
                    <TableCell >{format(new Date(student?.dob!), "yyyy-mm-dd") || "-"}</TableCell>
                    <TableCell >
                        
                        {profile?.data?.role === "admin" && <Link href={`/dashboard/students?id=${student?.id}`}>
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
    </div>
  )
}

export default StudentsList


{/* <Pagination>
    <PaginationContent>
        <PaginationItem>
        <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
        <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
        <PaginationNext href="#" />
        </PaginationItem>
    </PaginationContent>
</Pagination> */}