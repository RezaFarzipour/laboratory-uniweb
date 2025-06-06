"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { getAllServiceCustomer } from "@/services/api/service";
import { staggerContainer } from "@/utils/motion";
import { cn } from "@/utils/cn";
import { ServiceDetailsType } from "@/types";
import TitleStructure from "@/components/element/TitleStructure";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { BtnLoader } from "@/components/element/Loader";
import CardModule from "@/components/module/cardModule/CardModule";

type ServicesPageProps = {
  initialData: ServiceDetailsType[];
};
const Services = ({ initialData }: ServicesPageProps) => {
  const { view } = useTableStore();
  const { data, isPending } = useQuery({
    queryKey: ["getAll-servicesCustomer"],
    queryFn: getAllServiceCustomer,
    initialData, // 👈 داده اولیه از SSR
    refetchOnWindowFocus: true, // 👈 فعال‌سازی رفرش تب
  });
  const formDataServices = Array.isArray(data) ? data : [];
  const { sortedItems } = useFilteredContainer(formDataServices);

  return (
    <motion.section
      variants={staggerContainer(0.5, 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-12"
    >
      <span className="hash-span" id="Services-Card">
        &nbsp;
      </span>

      <div className="flex flex-col items-center justify-center gap-5 w-full py-16">
        <h3 className="text-xl">
          <TitleStructure size="1rem">خدمات ما</TitleStructure>
        </h3>

        <div className="flex flex-col gap-12 lg:gap-5 lg:flex-row justify-center w-full items-center">
          <FilteredContainer
            datas={formDataServices}
            quantity="سرویس ها"
            topContents={!!formDataServices?.length}
            viewContent={true}
            viewContentSmSize={true}
            btn={false}
            dropDownBtn={false}
            roles={false}
            addBtn={false}
            rolesDropDown={false}
            stausDropDown={false}
            bottomContents={!!formDataServices?.length}
          >
            {isPending ? (
              <BtnLoader />
            ) : (
              <div
                className={cn(
                  "grid w-full gap-4 mt-10 mb-32 gap-y-8",
                  view
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                )}
              >
                <CardModule
                  isDate={false}
                  isMoreDetails="anyServices"
                  data={sortedItems}
                  widthConter="100%"
                  heightImg="250px"
                  heightConter="200px"
                  bottomOffset="160"
                  styleForAdmin={false}
                  view={view}
                />
              </div>
            )}
          </FilteredContainer>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
