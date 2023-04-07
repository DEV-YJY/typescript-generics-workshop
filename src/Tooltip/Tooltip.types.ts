import { ReactNode } from "react";

export type TooltipType = {
  content: string | string[];
  position?:
    | "top-left"
    | "top-row"
    | "right"
    | "top-right"
    | "top-left"
    | "bottom"
    | "left"
    | "top";
  delay?: number;
  children: ReactNode;
  bgColour: string;
};
