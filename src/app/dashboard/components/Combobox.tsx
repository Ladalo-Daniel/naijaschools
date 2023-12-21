"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { UseFormReturn, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ComboboxForm({ institutions, form }: {
    institutions: {
        label: string,
        value: string,
    }[],
    form: UseFormReturn<z.infer<typeof userFormSchema>>,
}) {

  return (
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Institution</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? institutions.find(
                            (institution) => institution.value === field.value
                          )?.label
                        : "Select institution"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search for your school..."
                      className="h-9"
                    />
                    <CommandEmpty>No Institution found.</CommandEmpty>
                    <CommandGroup>
                      {institutions.map((institution) => (
                        <CommandItem
                          value={institution.label}
                          key={institution.value}
                          onSelect={() => {
                            form.setValue("institution", institution.value)
                          }}
                        >
                          {institution.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              institution.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the institution that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}
