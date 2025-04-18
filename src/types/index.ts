import React, { SVGProps } from "react";
import { IconType } from "react-icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DashboardMinicardProps {
  color: string;
  shadow: string;
  label: string;
  count: number;
  icon: IconType;
}
export interface SidebarLink {
  id: number;
  title: string;
  to: string;
  hover?: string;
  icon: IconType;
}

//reza:


export type contactInfoType = {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
};



export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}


export interface FormInputConfig {
  id: number;
  label: string;
  name: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  boleean?: boolean;
  options?:{label:string,value:boolean}[]
}
