import { FC } from "react";

interface TableEmptyProps {
  /* props go here */
  title: string;
}

const TableEmpty: FC<TableEmptyProps> = ({ title }) => {
  return (
    <div className='min-h-[300px] items-center justify-center flex'>
      <div className='text-center'>
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>No {title} Created</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Get started by adding a new {title}.
        </p>

      </div>
    </div>
  );
};

export default TableEmpty;
