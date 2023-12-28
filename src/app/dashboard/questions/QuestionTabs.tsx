import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"

export default function QuestionTabs({ questions, institutions }: {
    questions: React.JSX.Element,
    institutions: React.JSX.Element,
}) {
  return (
    <Tabs defaultValue="questions" className="max-w-max flex-1">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="institutions">Institutions</TabsTrigger>
      </TabsList>
      <TabsContent value="questions">
        { questions }
      </TabsContent>
      <TabsContent value="institutions">
        { institutions }
      </TabsContent>
    </Tabs>
  )
}
