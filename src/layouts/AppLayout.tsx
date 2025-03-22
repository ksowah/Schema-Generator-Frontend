"use client"

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sideBaropened, { toggle }] = useDisclosure();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 40 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !sideBaropened, desktop: sideBaropened },
      }}
      padding={"xs"}
    >
      <Sidebar opened={sideBaropened} toggle={toggle} />
      <AppShell.Main className="bg-primary-100/20" h={"calc(100vh - 100px)"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
