'use client';

import { cn } from "@/utils/cn";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useMemo } from "react";

interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent: boolean;
}

const AppBreadcrumbs: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = useMemo(() => {
    const crumbs: BreadcrumbItem[] = [];
    let accumulatedPath = '';
    
    segments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      crumbs.push({
        href: accumulatedPath,
        label: _.startCase(segment),
        isCurrent: index === segments.length - 1
      });
    });

    return crumbs;
  }, [pathname]);

  const lastBreadcrumb = _.last(breadcrumbs);
  const canGoBack = breadcrumbs.length > 1;

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  if (breadcrumbs.length === 0) return null;

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-row items-center space-x-2">
        {canGoBack && (
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center rounded border border-transparent p-1 text-gray-700 bg-gray-50 shadow-sm hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        <h2 className="text-lg leading-7 text-gray-900 tracking-wider">
          {lastBreadcrumb?.label}
        </h2>
      </div>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <div className="flex">
              <Link
                href="/"
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                Home
              </Link>
            </div>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <Link
                  href={crumb.href}
                  className={cn(
                    crumb.isCurrent ? "bg-gray-100" : "bg-white",
                    "ml-2 text-xs font-medium text-gray-500 rounded-md p-0.5 px-1.5 hover:bg-gray-200 hover:text-gray-700"
                  )}
                  aria-current={crumb.isCurrent ? "page" : undefined}
                >
                  {crumb.label}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default AppBreadcrumbs;
