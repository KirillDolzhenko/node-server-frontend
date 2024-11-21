import { ReactNode } from "react";

export interface IPropsClassName {
  className?: string;
}

export interface IPropsChildren extends IPropsClassName {
  children: ReactNode;
}
