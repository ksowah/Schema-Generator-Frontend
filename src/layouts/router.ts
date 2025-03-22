import {
  BoltIcon,
  BuildingOffice2Icon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export interface INavItemProp {
  name: string;
  path: string;
  Icon: typeof HomeIcon;
  permission?: string;
}

export const routes: INavItemProp[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: HomeIcon,
    permission: "",
  },
  {
    name: "Projects",
    path: "/dashboard/projects",
    Icon: BuildingOffice2Icon,
    permission: "church:*",
  },
];
