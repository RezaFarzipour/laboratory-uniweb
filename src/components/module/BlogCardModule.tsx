"use client";

import { LatestArticles } from "@/constants/data";
import React from "react";
import TitleStructure from "../element/TitleStructure";
import SectionWrapper from "@/hoc/SectionWrapper";
import CardModule from "./CardModule";

const BlogCardModule = () => {
  return (
    <div className="full-w flex flex-col items-center justify-center gap-5 py-16 lg:py-6">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem"> وبلاگ های ما </TitleStructure>
      </h3>

      <h2 className="font-extrabold text-2xl text-wrap">
        نگاهی به آخرین مقالات ما بندازید.
      </h2>
      <div className="flex flex-col gap-36 lg:gap-5 lg:flex-row justify-center w-full items-center p-4 ">
        <CardModule
          data={LatestArticles}
          widthConter="95%"
          heightImg="300px"
          heightConter="350px"
        />
      </div>
    </div>
  );
};

export default SectionWrapper(BlogCardModule, "Blog-Card");
