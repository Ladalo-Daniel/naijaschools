import React from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/progress";
import { Chip } from '@nextui-org/chip'

export default function GrandeProgress({ score }: { score: number }) {
  return (
    <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={score}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {score}%
        </Chip>
      </CardFooter>
    </Card>
  );
}
