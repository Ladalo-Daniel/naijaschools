'use client'

import React from "react"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Avatar } from "@nextui-org/avatar"
import { User } from "@/supabase/user"
import { useGetInstitutionById } from "@/lib/react-query"
import { Building, Globe } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"
import Link from "next/link"

export const UserCard = ({ author, authorTrigger }: { author: User, authorTrigger: React.JSX.Element }) => {
  const { data: institution } = useGetInstitutionById(author?.institution!)

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        {authorTrigger}
      </PopoverTrigger>
      <PopoverContent className="p-1">
      <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
        <CardHeader className="justify-between">
            <div className="flex gap-3">
            <Avatar isBordered radius="full" size="md" src={author?.image_url!} alt={author?.username!} />
            <div className="flex flex-col items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{author?.first_name} {author?.last_name}</h4>
                <h5 className="text-small tracking-tight text-default-500">@{author?.username}</h5>
            </div>
            </div>
            <Button
                className={""}
                color="primary"
                radius="full"
                size="sm"
                variant={"flat"}
                as={Link}
                href={`/dashboard/profile/${author?.username}`}
            >
            Profile
            </Button>
        </CardHeader>
        <CardBody className="px-3 py-1">
            <p className="text-small pl-px text-default-500">
            {author?.bio?.slice(0, 120) + (author?.bio?.slice(0, 121) ? '...' : "")}
            </p>
        </CardBody>
        <CardFooter className="gap-3 flex flex-col justify-start items-start">
            <div className="flex gap-1 items-center">
                <p className="font-semibold text-primary text-small"><Building size={12} /></p>
                <p className=" text-default-500 text-small">{institution?.data?.name}</p>
            </div>
            {author?.faculty && <div className="flex gap-1 items-center">
                <p className="font-semibold text-default-600 text-small"><Globe size={12} /></p>
                <p className="text-default-500 text-small">{author?.faculty!}</p>
            </div>}
        </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
