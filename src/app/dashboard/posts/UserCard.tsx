'use client'

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@/supabase/user";
import { useGetInstitutionById } from "@/lib/react-query";
import { Building, Globe } from "lucide-react";
import Image from "next/image";

export const UserCard = ({ author }: { author: User }) => {
  const { data: institution } = useGetInstitutionById(author?.institution!)

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User   
          as="button"
          name="Zoe Lang"
          description="Product Designer"
          className="transition-transform"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard />
      </PopoverContent>
    </Popover>
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={author.image_url!} as={Image} fill alt={author.username!} quality={100} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{author.first_name} {author.last_name}</h4>
            <h5 className="text-small tracking-tight text-default-500">@{author.username}</h5>
          </div>
        </div>
        <Button
          className={""}
          color="primary"
          radius="full"
          size="sm"
          variant={"solid"}
        >
          Profile
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          {author?.bio}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-primary text-small"><Building size={12} /></p>
          <p className=" text-default-500 text-small">{institution?.data?.name}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small"><Globe size={12} /></p>
          <p className="text-default-500 text-small">{author?.faculty}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
