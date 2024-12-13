// sidebarLinks.js
import { Baby, HardHat, NotebookTabs, School } from "lucide-react";

 const sidebarLinks = [
  {
    href: "/students",
    icon: Baby,
    label: "Students",
  },
  {
    href: "/professors",
    icon: HardHat,
    label: "Professors",
  },
  {
    href: "/courses",
    icon: NotebookTabs,
    label: "Courses",
  },
  {
    href: "/departments",
    icon: School,
    label: "Departments",
  },
//   {
//     href: "/settings",
//     icon: Settings,
//     label: "Settings",
//   },
];

export default sidebarLinks;