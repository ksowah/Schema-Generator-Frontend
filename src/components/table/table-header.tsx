import { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon as Squares2X2IconSolid,
  Bars4Icon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
// import useKeyboardJs from "react-use/lib/useKeyboardJs";
import { Listbox, Transition } from "@headlessui/react";
import lodash from "lodash";
import { useUrlState } from "@/utils/use-url-state";
import { cn } from "@/utils/cn";
import wrapOnchange from "@/utils/wrap-onchange";
import wrapClick from "@/utils/wrap-click";
import SelectInput from "../select-input";

interface TableHeaderComponentProps {
  title: string;
  renderFilter?: FC<{
    filterOpen: boolean;
    setFilterOpen: (val: boolean) => void;
  }>;
  renderExport?: FC<{
    exportOpen: boolean;
    setExportOpen: (val: boolean) => void;
  }>;
  renderHeaderItems?: FC;
  searchOptions?: { label: string; value: string }[];
  gridable?: boolean;
  hasSearch?: boolean;
  refetch: () => void;
  canToggleView?: boolean;
  defaultSearchField?: string;
  loading?: boolean;
  isRefetching?: boolean;
  onSearchSubmit?: (search: string, searchField: string) => void;
  defaultView?: "grid" | "list";
  searchParamPrefix?: string;
  hasHeader?: boolean;
  defaultPageSize?: number;
}

const limits = [10, 20, 50, 100];

const TableHeaderComponent: FC<TableHeaderComponentProps> = ({
  defaultView,
  title,
  loading,
  isRefetching,
  renderFilter,
  gridable,
  renderExport,
  canToggleView = true,
  renderHeaderItems,
  hasSearch,
  refetch,
  onSearchSubmit,
  searchOptions = [],
  defaultSearchField = "",
  searchParamPrefix = "",
  defaultPageSize = 10,
  hasHeader = true,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  // const [searchPressed] = useKeyboardJs("command > k");
  // const [escapePressed] = useKeyboardJs("esc");
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>(
    (searchParamPrefix ?? "") + "search"
  );
  const [searchField, setSearchField] = useState<string>(
    (searchParamPrefix ?? "") + defaultSearchField
  );
  const [pageSize, setPageSize] = useUrlState<number>(
    (searchParamPrefix ?? "") + "pageSize",
    defaultPageSize
  );
  const [page, setPage] = useUrlState<number>(
    (searchParamPrefix ?? "") + "page"
  );
  const [viewType, setViewType] = useUrlState("view-type");
  // useEffect(() => {
  //   if (searchPressed === true) {
  //     searchRef?.current?.focus();
  //   }
  // }, [searchPressed]);

  // useEffect(() => {
  //   if (escapePressed === true) {
  //     searchRef?.current?.blur();
  //   }
  // }, [escapePressed]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageSize]);

  useEffect(() => {
    if (defaultView && !viewType) {
      setViewType(defaultView);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultView]);

  return (
    <div
      className='px-4 sm:px-6 md:px-0'
      style={{
        display: hasHeader ? "auto" : "none",
      }}
    >
      <div className='block'>
        <div className='flex flex-row items-center'>
          <div className='flex-1 flex space-x-6 xl:space-x-8' aria-label='Tabs'>
            {hasSearch && (
              <div className='flex items-center'>
                {searchOptions.length > 0 && (
                  <SelectInput
                    id={"searchField"}
                    labelHidden={true}
                    values={{ searchField }}
                    handleChange={(e: any) => setSearchField(e.target.value)}
                    handleBlur={undefined}
                    options={[
                      {
                        label: "Search By",
                        value: "",
                      },
                      ...searchOptions,
                    ]}
                  />
                )}

                <div
                  className={cn(
                    "w-96 relative  text-gray-500 dark:text-gray-200 focus-within:text-gray-500 dark:focus-within:text-gray-300",
                    searchOptions?.length ? "ml-2" : ""
                  )}
                >
                  <label htmlFor='search' className='sr-only'>
                    Search {title ? lodash.startCase(title) : "ECG"}
                  </label>
                  <input
                    ref={searchRef}
                    id='search'
                    type='search'
                    placeholder={`Search ${title ? lodash.startCase(title) : "ECG"}`}
                    onChange={wrapOnchange(setSearch)}
                    className='h-[38px] block appearance-none w-full rounded-md border-gray-200 dark:border-gray-700 pl-8 py-1.5 placeholder-gray-500 dark:placeholder-gray-300 dark:text-white focus:border-gray-300 dark:focus:border-gray-600 sm:text-sm focus:ring-0 dark:bg-gray-900'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-2'>
                    <MagnifyingGlassIcon
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </div>
                  {search?.trim?.() === "" ? (
                    <div className='pointer-events-none absolute inset-y-0 right-1.5 flex items-center justify-center'>
                      <span
                        className='hidden sm:block text-gray-500 dark:text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 dark:border-gray-600 rounded-md'
                        style={{ opacity: 1 }}
                      >
                        <span className='sr-only'>Press </span>
                        <kbd className='font-sans'>
                          <abbr title='Command' className='no-underline'>
                            ⌘
                          </abbr>
                        </kbd>
                        <span className='sr-only'> and </span>
                        <kbd className='font-sans'>K</kbd>
                        <span className='sr-only'> to search</span>
                      </span>
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={wrapOnchange(() =>
                    onSearchSubmit?.(search, searchField)
                  )}
                  disabled={loading}
                  className={cn(
                    hasSearch
                      ? "bg-primary-600 dark:bg-gray-900 shadow-sm"
                      : "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
                    "h-[38px] p-2 px-5 rounded-md border border-gray-200 text-white dark:text-gray-400  mx-1 font-light text-xs focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  )}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            )}
          </div>
          {renderHeaderItems && renderHeaderItems({})}
          {gridable && canToggleView && (
            <div className='hidden ml-6 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg items-center sm:flex'>
              <button
                type='button'
                onClick={wrapClick(() => setViewType("list"))}
                className={cn(
                  viewType !== "grid"
                    ? "bg-white dark:bg-gray-900 shadow-sm"
                    : "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
                  "p-1.5 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                )}
              >
                <Bars4Icon className='h-5 w-5' aria-hidden='true' />
                <span className='sr-only'>Use list view</span>
              </button>
              <button
                type='button'
                onClick={wrapClick(() => setViewType("grid"))}
                className={cn(
                  viewType === "grid"
                    ? "bg-white dark:bg-gray-900 shadow-sm"
                    : "hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm",
                  "ml-0.5 p-1.5 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                )}
              >
                <Squares2X2IconSolid className='h-5 w-5' aria-hidden='true' />
                <span className='sr-only'>Use grid view</span>
              </button>
            </div>
          )}
          <div className='hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex'>
            <button
              type='button'
              onClick={wrapClick(refetch)}
              disabled={isRefetching}
              className='bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
            >
              <ArrowPathIcon
                className={cn(
                  isRefetching ? "animate-spin" : "animate-none",
                  "h-5 w-5"
                )}
                aria-hidden='true'
              />
              <span className='sr-only'>Refresh</span>
            </button>
          </div>

          {renderExport && renderFilter ? (
            <div className='hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex divide-x  divide-gray-300 dark:divide-gray-600'>
              <button
                type='button'
                onClick={wrapClick(() => setFilterOpen(true))}
                className='bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-l-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
              >
                <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                <span className='sr-only'>Filter items</span>
              </button>
              <button
                type='button'
                onClick={wrapClick(() => setExportOpen(true))}
                className='bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-r-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
              >
                <ArrowDownTrayIcon className='h-5 w-5' aria-hidden='true' />
                <span className='sr-only'>Export data</span>
              </button>
            </div>
          ) : (
            <>
              {renderFilter && (
                <div className='hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex'>
                  <button
                    type='button'
                    onClick={wrapClick(() => setFilterOpen(true))}
                    className='bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
                  >
                    <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                    <span className='sr-only'>Filter items</span>
                  </button>
                </div>
              )}
              {renderExport && (
                <div className='hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex'>
                  <button
                    type='button'
                    onClick={wrapClick(() => setExportOpen(true))}
                    className='bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
                  >
                    <ArrowDownTrayIcon className='h-5 w-5' aria-hidden='true' />
                    <span className='sr-only'>Export data</span>
                  </button>
                </div>
              )}
            </>
          )}

          <div className='ml-3'>
            <Listbox value={pageSize} onChange={setPageSize}>
              {({ open }) => (
                <>
                  <Listbox.Label className='sr-only'>
                    Change limit
                  </Listbox.Label>
                  <div className='relative'>
                    <div className='relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-300 border border-gray-200'>
                      <div className='relative bg-white items-center inline-flex px-2 border border-transparent rounded-l-lg text-gray-700'>
                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        <p className='text-sm font-medium whitespace-nowrap'>
                          {pageSize} items per page
                        </p>
                      </div>
                      <Listbox.Button className='relative inline-flex items-center bg-white p-2 py-2 rounded-l-none rounded-r-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:z-10 focus:none focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500'>
                        <span className='sr-only'>Change limit</span>
                        <ChevronDownIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      </Listbox.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='origin-top-right absolute z-10 right-0 mt-2 w-16 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {limits.map((limit) => (
                          <Listbox.Option
                            key={limit}
                            className={({ active }) =>
                              cn(
                                active
                                  ? "text-white dark:text-gray-900 bg-primary-500"
                                  : "text-gray-900 dark:text-gray-100",
                                "cursor-default select-none relative p-2 text-sm"
                              )
                            }
                            value={limit}
                          >
                            {({ selected, active }) => (
                              <div className='flex flex-col'>
                                <div className='flex justify-between items-center'>
                                  <p
                                    className={
                                      selected ? "font-semibold" : "font-normal"
                                    }
                                  >
                                    {limit}
                                  </p>
                                  {selected ? (
                                    <span
                                      className={
                                        active
                                          ? "text-white dark:text-gray-900"
                                          : "text-primary-500"
                                      }
                                    >
                                      <CheckIcon
                                        className='h-4 w-4'
                                        aria-hidden='true'
                                      />
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
      </div>
      {renderFilter && renderFilter({ filterOpen, setFilterOpen })}
      {renderExport && renderExport({ exportOpen, setExportOpen })}
    </div>
  );
};

export default TableHeaderComponent;
