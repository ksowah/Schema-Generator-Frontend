import { FC } from "react";
import TableGridLoader from "./table-grid-loader";

interface TableGridBodyComponentProps<TData = any> {
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  renderItem?: FC<TData>;
  loading?: boolean;
}

const MyTableGridBodyComponent: FC<TableGridBodyComponentProps> = ({
  data,
  renderItem,
  loading,
}) => {
  return (
    <div className='mt-5 flex-1  overflow-y-auto px-4 sm:px-6'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {loading ? (
          <TableGridLoader />
        ) : (
          data.rows?.map((item) => renderItem?.(item))
        )}
      </div>
    </div>
  );
};

export default MyTableGridBodyComponent;
