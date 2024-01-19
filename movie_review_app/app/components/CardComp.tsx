"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardCompProps {
  title: string;
  description: string;
}

const CardComp: React.FC<CardCompProps> = (props) => {
  return (
    <div className="my-2">
      <Card className="max-w-[550px] w-full p-3 overflow-x-auto">
        <CardHeader className="p-0">{props.title}</CardHeader>
        <CardDescription>{props.description}</CardDescription>
      </Card>
    </div>
  );
};

export default CardComp;
