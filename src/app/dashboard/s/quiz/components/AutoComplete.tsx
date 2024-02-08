'use client'

import React from "react";
import {Autocomplete as NextAutoComplete, AutocompleteItem} from "@nextui-org/autocomplete";
import { SearchIcon } from "lucide-react";
import { CourseList } from "@/supabase/courses";
import Link from "next/link";

export default function AutoComplete({ courses, institutionId }: { courses: CourseList, institutionId: string }) {
  return (
    <NextAutoComplete
      classNames={{
        base: "max-w-md",
        listboxWrapper: "max-h-[500px] flex flex-col gap-3",
        selectorButton: "text-default-500"
      }}
      defaultItems={courses}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
        },
      }}
      color="success"
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      aria-label="Select a course"
      placeholder="Start typing..."
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
      radius="full"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item?.name!} as={Link} href={`/dashboard/s/quiz/start/${institutionId}/course/${item.id}`} className="py-2 border-b  rounded-none my-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-[18px] text-primary">{item.code}</span>
                <span className="text-small">{item.name!}</span>
                <span className="text-tiny text-default-400">{item.description!}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </NextAutoComplete>
  );
}
