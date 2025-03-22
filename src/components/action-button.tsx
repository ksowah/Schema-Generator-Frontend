import { FC } from "react";
import {
  ArrowPathIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
  BanknotesIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowsPointingOutIcon,
  PlusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@mantine/core";
import wrapClick from "@/utils/wrap-click";
import { cn } from "@/utils/cn";

export const Actions = [
  "update",
  "view",
  "delete",
  "renew",
  "resolve",
  "expand",
  "cancel",
  "start",
  "goto",
  "complete",
  "completePay",
  "updateDate",
  "viewInvoice",
  "create",
  "assign",
] as const;
export type Action = (typeof Actions)[number];

const ActionIcons: { [key in Action]: typeof EyeIcon } = {
  update: PencilSquareIcon,
  view: EyeIcon,
  delete: TrashIcon,
  renew: ArrowPathIcon,
  resolve: ClipboardDocumentListIcon,
  cancel: XCircleIcon,
  expand: ArrowsPointingOutIcon,
  start: ClipboardDocumentCheckIcon,
  goto: ArrowTopRightOnSquareIcon,
  complete: CheckCircleIcon,
  completePay: BanknotesIcon,
  updateDate: CalendarIcon, // Assign an icon to the new action
  viewInvoice: DocumentTextIcon,
  create: PlusIcon,
  assign: UserPlusIcon,
};

interface ActionButtonProps {
  action: Action;
  onClick: (...val: any) => any;
  disabled?: boolean;
  tooltip?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  action,
  onClick,
  disabled = false,
  tooltip,
}) => {
  const Icon = ActionIcons[action];

  return (
    <div>
      {tooltip && (
        <Tooltip label={`#tooltip-${action}`} position="top">
          {tooltip}
        </Tooltip>
      )}
      {/* <div className='w-80 h-16 ' </div> */}
      <button
        type="button"
        id={`tooltip-${action}`}
        onClick={wrapClick(onClick)}
        disabled={disabled}
        className={cn(
          disabled
            ? "cursor-not-allowed  text-gray-500 hover:bg-gray-300"
            : "text-gray-500 hover:bg-gray-300 hover:text-gray-900",
          "inline-flex items-center justify-center cursor-pointer rounded-[4px] w-7 h-7 border border-transparent p-1 bg-zinc-100  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        )}
      >
        <Icon className={cn("w-4 h-4 text-[#666666]")} aria-hidden="true" />
      </button>
    </div>
  );
};
export default ActionButton;
