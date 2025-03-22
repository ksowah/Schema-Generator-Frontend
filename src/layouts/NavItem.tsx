import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { INavItemProp } from "./router";
import { cn } from "@/utils/cn";

const NavItem = ({ name, Icon, path }: INavItemProp) => {
  const pathname = usePathname();

  return (
    <Button
      component={Link}
      href={path}
      my={10}
      className={cn(
        "bg-transparent w-full flex items-center justify-between px-4 py-2",
        pathname === path
          ? "bg-primary-700 text-primary-200 hover:bg-primary-700 hover:text-primary-300"
          : "text-primary-800 dark:text-primary-200 dark:hover:text-primary-200 hover:bg-primary-200 hover:text-primary-800 dark:hover:bg-primary-900/30"
      )}
      style={{
        backgroundColor:
        pathname === path
            ? "rgb(14 74 153 / var(--tw-bg-opacity, 1))"
            : "",
      }}
    >
      <div className="flex items-center gap-x-2">
        <Icon className="w-5 h-5" />
        <Text>{name}</Text>
      </div>
      {/* {currentPath === path && <ChevronRightIcon className="w-5 h-5 ml-auto" />} */}
    </Button>
  );
};

export default NavItem;

