import _ from "lodash";
import { FC, JSX, ReactNode } from "react";
import Shimmers from "./shimmers";
import { cn } from "@/utils/cn";
export interface TItem<TData = any> {
  id: string;
  header: string | ReactNode;
  cell: string | ((row: TData, rowIdx?: number) => ReactNode);
  loader?: "action" | "single" | "double" | "avatar";
}

const ShimmersMapping: { [key in NonNullable<TItem["loader"]>]: JSX.Element } =
  {
    action: <Shimmers.ActionsShimmer actionsCount={3} />,
    single: <Shimmers.SingleShimmer />,
    double: <Shimmers.DoubleShimmer />,
    avatar: <Shimmers.AvatarShimmer />,
  };

interface TableBodyProps<TData = any> {
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
  fixed?: boolean;
}

const MyTableBody: FC<TableBodyProps> = ({ items, data, loading, fixed }) => {
  return (
    <div className='my-2 overflow-x-auto sm:-mx-6 lg:-mx-0 no-scrollbar flex-1 flex overflow-y-hidden'>
      <div className='align-middle min-w-full sm:px-6 lg:px-6 flex-1 flex flex-col overflow-y-auto no-scrollbar'>
        <table
          className={cn(
            fixed ? "table-fixed" : "table-auto",
            "border-separate min-w-full divide-y divide-gray-200 border dark:divide-gray-700 border-x border-gray-200 dark:border-gray-700 border-y-0 "
          )} 
          style={{ borderSpacing: 0 }}
        >
          <thead className='bg-gray-50 dark:bg-gray-800  '>
            <tr className=''>
              {items.map((item, idx) => {
                return (
                  <th
                    key={idx}
                    scope='col'
                    className='sticky top-0 border-y border-gray-200 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-left text-xs font-light text-gray-900 dark:text-gray-100 uppercase tracking-wider whitespace-nowrap '
                  >
                    {item.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto'>
            {loading ? (
              <tr>
                {items.map((item, idx: number) => (
                  <td key={idx} className='px-6 py-4 border-b border-gray-200'>
                    {ShimmersMapping[item.loader || "single"]}
                  </td>
                ))}
              </tr>
            ) : (
              data.rows.map((row: { [key: string]: any }, rowIdx: number) => (
                <tr
                  key={row.id || rowIdx}
                  className='hover:bg-gray-50 transition-colors'
                >
                  {items.map((item, itemIdx) => (
                    <td
                      className='whitespace-nowrap px-6 py-4 text-sm text-gray-600 border-b border-gray-200 '
                      key={itemIdx}
                    >
                      {typeof item.cell === "string"
                        ? _.get(row, item.cell) || "N/A"
                        : item.cell?.(row, rowIdx)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTableBody;
