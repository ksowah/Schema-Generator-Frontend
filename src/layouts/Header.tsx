import {
  AppShell,
  Avatar,
  Burger,
  Button,
  Group,
  Popover,
  Text,
} from "@mantine/core";

import React, { FC } from "react";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  renderActions?: FC<{}>;
};
const Header = ({ opened, toggle, renderActions }: HeaderProps) => {
  return (
    <AppShell.Header className="bg-primary-100 dark:bg-primary-900/20 h-[5rem] ">
      <section className="w-full flex items-center justify-between h-full px-4">
        <Group h="100%" px="md" hiddenFrom="sm">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Text>Logo</Text>
        </Group>

        <Group
          h="100%"
          w="100%"
          visibleFrom="sm"
          className="w-full flex items-center justify-between h-full px-2"
        >
          {/* <AppBreadcrumbs /> */}
          <div></div>
          <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4 space-x-3">
            {renderActions?.({})}
          </div>
        </Group>
      </section>
    </AppShell.Header>
  );
};

export default Header;
