import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Icon from "react-icons/io5";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <Fa.FaHome />,
  },
  {
    title: "Raw Materials",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/rm/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/rm/list",
        icon: <Fa6.FaEye />,
      },
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "SubAssy",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/sas/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/sas/list",
        icon: <Fa6.FaEye />,
      },
    ],
  },
  {
    title: "Material Adjustment",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/maf/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/maf/list",
        icon: <Fa6.FaEye />,
      },
    ],
  },
  {
    title: "Drafts",
    path: "/drafts",
    icon: <Icon.IoSave />,
  },

  {
    title: "Review",
    path: "/review",
    icon: <Fa6.FaClipboard />,
  },
  {
    title: "Approve",
    path: "/approve",
    icon: <Fa6.FaClipboard />,
  },
  {
    title: "Logout",
    path: "/login",
    icon: <Fa.FaSignOutAlt />,
  },
];

export const SidebarDataReq = [
  {
    title: "Home",
    path: "/",
    icon: <Fa.FaHome />,
  },
  {
    title: "Raw Materials",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/rm/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/rm/list",
        icon: <Fa6.FaEye />,
      },
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "SubAssy",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/sas/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/sas/list",
        icon: <Fa6.FaEye />,
      },
    ],
  },
  {
    title: "Material Adjustment",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,

    subNav: [
      {
        title: "Create Ticket",
        path: "/maf/create",
        icon: <Icon.IoTicket />,
      },
      {
        title: "View Ticket List",
        path: "/maf/list",
        icon: <Fa6.FaEye />,
      },
    ],
  },
  {
    title: "Drafts",
    path: "/drafts",
    icon: <Icon.IoSave />,
  },

  {
    title: "Logout",
    path: "/login",
    icon: <Fa.FaSignOutAlt />,
  },
];

export const SidebarDataRev = [
  {
    title: "Raw Materials",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "SubAssy",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "Material Adjustment",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "Review",
    path: "/review",
    icon: <Fa6.FaClipboard />,
  },
  {
    title: "Logout",
    path: "/login",
    icon: <Fa.FaSignOutAlt />,
  },
];

export const SidebarDataApp = [
  {
    title: "Raw Materials",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "SubAssy",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "Material Adjustment",
    iconClosed: <Icon.IoChevronDown />,
    iconOpened: <Icon.IoChevronUp />,
    subNav: [
      {
        title: "Reports",
        path: "/rm/report",
        icon: <Fa6.FaClipboard />,
      },
    ],
  },
  {
    title: "Approve",
    path: "/approve",
    icon: <Fa6.FaClipboard />,
  },
  {
    title: "Logout",
    path: "/login",
    icon: <Fa.FaSignOutAlt />,
  },
];
