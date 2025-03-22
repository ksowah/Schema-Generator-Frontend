import { FC, Fragment, useRef, PropsWithChildren } from "react";
import {
  Dialog,
  DialogBackdrop,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {XMarkIcon, QuestionMarkCircleIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";
import wrapClick from "@/utils/wrap-click";

interface ModalProps {
  title: string;
  description?: string;
  open: boolean;
  close: () => void;
  renderActions?: () => JSX.Element;
  hideActions?: boolean;
  hidePadding?: boolean;
  loading?: boolean;
  size?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

const sizeMap = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  close,
  children,
  renderActions,
  title,
  description,
  hideActions,
  hidePadding,
  loading,
  size = "3xl",
}) => {
  // const theme = useReactiveVar(currentConfigVar);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={cn("theme", "fixed z-10 inset-0 overflow-y-auto")}
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                sizeMap[size],
                "inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full",
              )}
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-800 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                  onClick={() => close()}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:flex-col">
                <div className="mx-auto flex-shrink-0 flex flex-col items-start rounded sm:mx-0 sm:px-6 sm:py-4 border-b border-gray-200">
                  <Dialog.Title
                    as="h3"
                    className="flex-1 text-lg leading-4 font-medium text-gray-900 dark:text-gray-50 text-center sm:text-left"
                  >
                    {title}
                  </Dialog.Title>
                  {description && (
                    <p className="w-full mt-1  text-base  text-gray-600 dark:text-gray-300 sm:w-auto sm:text-sm">
                      {description}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    hideActions || hidePadding
                      ? "overflow-hidden min-h-[50vh]"
                      : "sm:p-6 min-h-[50vh] overflow-y-auto",
                    "flex flex-col flex-1 w-full max-h-[75vh]",
                  )}
                >
                  {/* {loading ? <Loader /> : children} */}
                  {loading ? <p>Loadig...</p> : children}
                </div>
              </div>
              {!hideActions && (
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                  <>{renderActions?.()}</>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={wrapClick(() => close())}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition.Root>
  );
};


type ConfirmationModalProps = {
  open: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  okayText?: string;
  cancelText?: string;
  onOkay: () => void;
  onCancel?: () => void;
  icon?: typeof QuestionMarkCircleIcon;
}

export function ConfirmationModal({ title, open, disabled, description, onCancel, onOkay, okayText, cancelText, icon: Icon = QuestionMarkCircleIcon }: ConfirmationModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={cn("theme", "fixed z-10 inset-0 overflow-y-auto")}
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cn(
                "max-w-md",
                "inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full",
              )}
            >
              <div className="w-full flex justify-between items-center px-4 pt-4">
                <div>
                  <div className="rounded-full bg-red-50 p-3 grid place-items-center">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-500 font-bold"
                        aria-hidden="true" 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-800 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                    onClick={() => onCancel?.()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                  </button>
                </div>
              </div>
              <div className="sm:flex sm:flex-col">
                <div className="mx-auto flex-shrink-0 flex flex-col items-start rounded sm:mx-0 sm:px-6 sm:py-4">
                  <Dialog.Title
                    as="h3"
                    className="flex-1 text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50 text-center sm:text-left"
                  >
                  {title ?? "Are you sure you want to do this?"}
                  </Dialog.Title>
                  <p className="w-full mt-4 mb-4 text-base  text-gray-600 dark:text-gray-300 sm:w-auto sm:text-sm">
                    {description ?? "This action cannot be undone"}
                  </p>
                </div>
              </div>
              <div
                className="px-4 pb-4 sm:px-6  sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  disabled={disabled}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onOkay}
                >
                  {okayText ?? "Okay"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={wrapClick(() => onCancel?.())}
                  ref={cancelButtonRef}
                >
                  {cancelText ?? "Close"}
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
