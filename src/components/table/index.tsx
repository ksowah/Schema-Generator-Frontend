"use client"

import MyTableBody, { TItem } from "./table-body";
import { FC } from "react";
import MyTableFooter from "./table-footer";
import MyTableHeader from "./table-header";
import TableEmpty from "./table-empty";
import MyTableGridBodyComponent from "./table-grid-body";

interface MyTableProps<TData = any> {
  /* props go here */
  items: TItem<TData>[];
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  loading: boolean;
  title: string;
  refetch: ()=>void
  renderHeaderItems?: FC;
  viewType?: "list" | "grid";
  renderGridItem?: FC<TData>;
  isRefetching?: boolean;
  searchOptions?: { label: string; value: string }[];

  hasSearch?: boolean;
  onSearchSubmit?: (search: string, searchField: string) => void;
  defaultSearchField?: string;

}

const MyTable: FC<MyTableProps> = ({
  items,
  data,
  loading,
  title,
  renderHeaderItems,
  searchOptions,
  hasSearch,
  refetch,
  onSearchSubmit,
  defaultSearchField,
  viewType = "list",
  renderGridItem,
  isRefetching,
}) => {
  return (
    <div className='space-y-6 flex-1 flex flex-col overflow-y-hidden min-w-full'>
      <div className='px-4 sm:px-6'>
        <MyTableHeader
          title={title}
          refetch={refetch}
          loading={isRefetching}
          hasSearch={hasSearch}
          onSearchSubmit={onSearchSubmit}
          defaultSearchField={defaultSearchField}
          searchOptions={searchOptions}
          renderHeaderItems={renderHeaderItems}
        />
      </div>
      {!loading && data?.rows?.length ? (
        <>
          {viewType === "grid" ? (
            <MyTableGridBodyComponent
              data={data}
              renderItem={renderGridItem}
              loading={loading}
            />
          ) : (
            <MyTableBody
              items={items}
              data={data}
              loading={loading}
              title={title}
            />
          )}
          <div className='px-4 sm:px-6'>
            <MyTableFooter data={data} />
          </div>
        </>
      ) : (
        <TableEmpty title={title} />
      )}
    </div>
  );
};

export type { TItem } from "./table-body";

export default MyTable;
