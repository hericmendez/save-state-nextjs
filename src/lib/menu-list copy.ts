import { Settings, SquarePen, LucideIcon, GamepadIcon } from "lucide-react";

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
            }
          ]
        },

        {
          href: "/placeholder",
          label: "Game Lists",
          icon: GamepadIcon,
          submenus: [
            {
              href: "#",
              label: "Dummy List"
            },
            /* Listas criadas pelo usuário serão injetadas aqui */
            {
              href: "#",
              label: "+ New List"
            }
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
    }
  ];
}
