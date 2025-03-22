import config from "@/config";
import { cn } from "@/utils/cn";
import { useUrlState } from "@/utils/use-url-state";
import wrapClick from "@/utils/wrap-click";
import lodash from "lodash";
import numeral from "numeral";
import { FC } from "react"

interface TableFooterComponentProps<TData = any> {
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  noBorder?: boolean
  searchParamPrefix?: string
}

const TableFooterComponent: FC<TableFooterComponentProps> = ({
  data,
  noBorder,
  searchParamPrefix
}) => {

  const [page, setPage] = useUrlState<number>( (searchParamPrefix ?? "") + "page");
  const [pageSize] = useUrlState<number>("pageSize");
  const setNextPage = () => setPage(Number(page || config.constants.pageSize) + 1);
  const setPreviousPage = () => setPage(Number(page || config.constants.pageSize) - 1);
  const nextEnabled = Number(page || config.constants.pageSize) < (data?.totalPages || 0);
  const previousEnabled = Number(page || config.constants.pageSize) > 1;
  const startIndex = ((Number(data?.page ?? (page || config.constants.page)) - 1) * Number(data?.pageSize ?? (pageSize || config.constants.pageSize))) + 1;
  const endIndex = lodash.min([(Number(data?.page ?? (page || config.constants.page)) *  Number(data?.pageSize ?? (pageSize || config.constants.pageSize))), (data?.total || Number.MAX_SAFE_INTEGER)]);

  return (
    <nav
      className={cn(
        noBorder ? "border-0" : "border",
        "bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between  border-gray-200 dark:border-gray-700 sm:px-6 sm:rounded-lg",
        "justify-self-end flex-shrink-0 w-full"
      )}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          {data?.total > 0 ? <>Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{numeral(data.total).format("0,0")}</span></> : "No"} results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          type="button"
          disabled={!previousEnabled}
          onClick={wrapClick(setPreviousPage)}
          className={cn(
            previousEnabled ? "bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-900 cursor-pointer" : "cursor-not-allowed bg-gray-100 dark:bg-gray-900",
            "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200"
          )}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!nextEnabled}
          onClick={wrapClick(setNextPage)}
          className={cn(
            nextEnabled ? "bg-white  dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-900 cursor-pointer" : "cursor-not-allowed bg-gray-100 dark:bg-gray-900",
            "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200"
          )}
        >
          Next
        </button>
      </div>
    </nav>
  )
}

export default TableFooterComponent