"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/element/table/CustomeTable";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  columns,
  productsINITIAL_VISIBLE_COLUMNS,
  products,
} from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { useTableStore } from "@/store/useTableSlice";
import React, { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/CardModule";

export const ProductsPage: React.FC = () => {
  const { view, visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(products);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="محصولات" />
        <FilteredContainer
          users={products}
          INITIAL_VISIBLE_COLUMNS={productsINITIAL_VISIBLE_COLUMNS}
          quantity="محصولات"
          firstActionContent="جزئیات"
          secondActionContent="حذف"
          viewContent={true}
          viewContentSmSize={false}
          topContents={true}
          bottomContents={true}
          btn={true}
          dropDownBtn={true}
          roles={false}
          product={true}
          image={true}
        >
          {!view ? (
            <CustomeTable
              headerColumns={headerColumns}
              sortedItems={sortedItems}
              firstActionContent="جزئیات"
              firstActionIcon={TbEyeDiscount}
              secondActionContent="حذف"
              secondActionIcon={MdDeleteOutline}
              image={true}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              <CardModule
                data={sortedItems}
                widthConter="100%"
                heightImg="200px"
                heightConter="150px"
                view={view}
              />
            </div>
          )}
        </FilteredContainer>
      </div>
    </div>
  );
};
