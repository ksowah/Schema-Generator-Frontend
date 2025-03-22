import {
  AppShell,
  Avatar,
  Burger,
  Button,
  Divider,
  Group,
  Menu,
  ScrollArea,
  Switch,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  BellAlertIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PowerIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { routes } from "./router";
import NavItem from "./NavItem";
import { clearAuth, currentUserVar } from "@/worker/auth";
import { redirect } from "next/navigation";
import { useReactiveVar } from "@apollo/client";

type SidebarProps = {
  opened: boolean;
  toggle: () => void;
};
const Sidebar = ({ opened, toggle }: SidebarProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [open, { toggle: toggleMenu }] = useDisclosure(false);

  const logOut = () => {
    clearAuth()
    redirect("/")
  }

  const currectUser: User | undefined = useReactiveVar(currentUserVar)


  return (
    <AppShell.Navbar
      p="md"
      className="bg-primary-100 md:dark:bg-primary-900/20 dark:bg-primary-800"
    >
      <AppShell.Section>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div
            role="button"
            className="flex items-center gap-x-3 w-full p-2 rounded-lg "
          >
            <Avatar
              size={"md"}
              name={"Kelvin Sowah"}
              src={"/assets/logo.jpeg"}
              alt={"kelvin sowah"}
              color="green"
              radius={"sm"}
            />
            <div className="flex flex-col ">
              <Text size="md" className="font-bold uppercase">
                Schema Creator
              </Text>
              <Text size="xs" className="text-gray-700 dark:text-gray-400">
                Hobby
              </Text>
            </div>
          </div>
        </Group>
      </AppShell.Section>
      <Divider className="my-2" />
      <AppShell.Section
        grow
        my="md"
        component={ScrollArea}
        className="flex flex-col gap-y-2 "
      >
        <Text size="xs" className="font-bold opacity-25 uppercase mx-2">
          Main
        </Text>
        {routes.map((route) => (
          <NavItem key={route.path} {...route} />
        ))}
      </AppShell.Section>
      <AppShell.Section p={"sm"}>
        <Text size="xs" className="font-bold opacity-25 uppercase mx-2">
          Others
        </Text>
        <Button
          variant="light"
          onClick={logOut}
          my={5}
          className="bg-transparent w-full text-primary-800 flex items-center gap-x-2 pl-2 hover:bg-primary-200 hover:text-primary-800 dark:hover:bg-primary-900/30 dark:text-primary-200 dark:hover:text-primary-200"
        >
          <PowerIcon className="w-5 h-5" />
          <Text mx={10}>Logout</Text>
        </Button>
        <Divider className="my-2" />
        <Menu
          // trigger="click-hover"
          position="right"
          openDelay={100}
          closeDelay={400}
          offset={20}
          // transitionProps={{ transition: "rotate-right", duration: 150 }}
          opened={open}
          onChange={toggleMenu}
        >
          <Menu.Target>
            <div
              role="button"
              className="flex items-center gap-x-3 w-full  p-2 rounded-lg hover:text-primary-800 dark:text-primary-200 dark:hover:text-primary-200"
            >
              <Avatar
                size={"md"}
                name={currectUser?.fullName}
                src={""}
                alt={currectUser?.fullName}
                color="green"
              />
              <div className="flex flex-col ">
                <Text size="sm" className="font-bold">
                  {currectUser?.fullName}
                </Text>
                <Text size="xs" className="">
                  {currectUser?.emailAddress}
                </Text>
              </div>
              <ChevronRightIcon className="w-4 h-4 hover:scale-110" />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Appearance</Menu.Label>
            <Menu.Item
              leftSection={<Cog6ToothIcon className="w-4 h-4" />}
              className="flex justify-between"
            >
              <Group justify="between">
                Dark Mode
                <Switch
                  checked={colorScheme === "dark"}
                  role="button"
                  size="xs"
                  onLabel="ON"
                  offLabel="OFF"
                  onChange={toggleColorScheme}
                />
              </Group>
            </Menu.Item>
            <Menu.Label>Application</Menu.Label>

            <Menu.Item
              leftSection={<MagnifyingGlassIcon className="w-4 h-4" />}
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              color="red"
              onClick={logOut}
              leftSection={<PowerIcon className="w-4 h-4" />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Sidebar;
