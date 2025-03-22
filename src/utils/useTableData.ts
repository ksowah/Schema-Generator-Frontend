import { useSearchParams } from "next/navigation";

interface UseTableDataInput<TData> {
    rows: TData[];
    count: number;
  }
  
  interface UseTableDataReturn<TData> {
    rows: TData[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
  }

export const useTableData = <TData = object>(
    { rows, count }: UseTableDataInput<TData> = {
      rows: [],
      count: 0,
    },
    prefix: string = "",
  ): UseTableDataReturn<TData> => {
    const searchParams = useSearchParams(); // it's not that deep
    return {
      rows: rows ?? [],
      total: count ?? 0,
      totalPages: Math.ceil(count / (Number(searchParams.get("pageSize")) ?? 10)),
      page: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
    };
  };