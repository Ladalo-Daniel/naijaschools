'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { User } from "@/supabase/user"
 
const FormSchema = z.object({
  make_admin: z.boolean().optional(),
  make_staff: z.boolean(),
})

export default function SwitchForm({ makeAdmin, userId, isPending, profile, setOpen }: { 
    makeAdmin: any, 
    userId: string,
    isPending?: boolean,
    profile?: User,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>> 
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        make_staff: profile?.role === 'staff' ? true : false,
        make_admin: profile?.role === 'admin' ? true : false,
      },
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
      makeAdmin({
        role: data?.make_admin ? "admin" : data?.make_staff ? "staff" : "user",
        userId: userId
      }, {
        onSettled: () => {
            setOpen?.(false)
        }
      })
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <div>
            <h3 className="mb-3 py-3 text-lg font-medium">Change {profile?.username}&#39;s Role.</h3>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="make_staff"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm", {
                    "border-2 border-primary": field.value
                  })}>
                    <div className="space-y-0.5">
                      <FormLabel>Staff</FormLabel>
                      <FormDescription>
                        Make {profile?.username || "this user"} a staff.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={form.getValues('make_admin')}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make_admin"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm", {
                    "border-2 border-primary": field.value
                  })}>
                    <div className="space-y-0.5">
                      <FormLabel>Admin</FormLabel>
                      <FormDescription>
                        Make {profile?.username || "this user"} an Admin.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={form.getValues('make_staff')}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className='w-full mt-4'>Sav{isPending ? 'ing...' : "e"}</Button>
        </form>
      </Form>
    )
  }

