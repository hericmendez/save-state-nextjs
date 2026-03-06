import {

  Settings,
  Bookmark,
  SquarePen,

  LucideIcon,
  GamepadIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Pages",
          icon: SquarePen,
          submenus: [
            {
              href: "/placeholder",
              label: "Placeholder"
            },

          ]
        },
        {
          href: "/components",
          label: "Components",
          icon: Bookmark,
          submenus: [
            {
              href: "/backlog",
              label: "Hybrid List"
            },
            {
              href: "/components/form-modal",
              label: "Form Modal"
            },
            {
              href: "/crud",
              label: "CRUD"
            }
          ]
        },
        {
          href: "/backlog",
          label: "Backlog",
          icon: GamepadIcon,
          submenus: [

          ]
        }
      ]
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Preferences",
          icon: Settings
        }
      ]
    },

  ];
}
