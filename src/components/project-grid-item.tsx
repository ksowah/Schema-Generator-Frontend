import {
    BuildingOfficeIcon,
    BuildingStorefrontIcon,
  } from "@heroicons/react/24/outline";
//   import { ActionButton } from "components";
  import _ from "lodash";
import ActionButton from "./action-button";
import moment from "moment"
  
  const ProjectGridItem = ({
    project,
    onExpand,
  }: {
    project: Project;
    onView: (project: Project) => void;
    onExpand: (project: Project) => void;
  }) => {

    const getStatusColors = (status: string) => {
        switch (status?.toLowerCase()) {
          case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-gray-50";
          case "paid":
            return "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-gray-50";
          case "rejected":
            return "bg-red-100 text-red-800 dark:bg-red-600 dark:text-gray-50";
          case "approved":
            return "bg-green-100 text-green-800 dark:bg-green-600 dark:text-gray-50";
          default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-50";
        }
      };
  
    return (
      <div className='relative overflow-hidden rounded-lg bg-white pb-8 shadow px-4 pt-4'>
        <dt>
          <div className='absolute rounded-md p-3 bg-primary-600'>
          <BuildingOfficeIcon
              className='h-6 w-6 text-white'
              aria-hidden='true'
            />
          </div>
  
          <p className='ml-16 truncate text-sm font-medium text-gray-500'>
            {moment(project.createdAt).format("Do MMM YYYY")}
          </p>
        </dt>
  
        <dd className='ml-16 flex items-baseline pb-6 sm:pb-7'>
          <div className='w-full'>
            <p className='font-medium text-gray-900 line-clamp-1'>
              {project.name}
            </p>
            <div className='flex items-center space-x-2 mt-1'>
              <span className='text-sm text-gray-500 line-clamp-1'>
                {project.description}
              </span>
            </div>
          </div>
  
          <div className='absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-2 flex justify-between items-center'>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColors(
                "paid"
              )}`}
            >
              {_.startCase("schema") || "N/A"}
            </span>
  
            <div className='flex space-x-2'>
              <ActionButton
                action='expand'
                onClick={() => onExpand(project)}
              />
            </div>
          </div>
        </dd>
      </div>
    );
  };
  
  export default ProjectGridItem;
  