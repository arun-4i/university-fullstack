"use client";

import { useState } from "react";
import sidebarLinks from "@/lib/sidebar-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, Settings } from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

   return (
     <div
       className={`relative border-r ${
         isCollapsed ? "w-16" : "w-36 md:w-52"
       } transition-all duration-300 ease-in-out flex flex-co`}
     >
       <div className="absolute top-[12px] -right-[16px] z-20">
         <Button
           onClick={() => setIsCollapsed(!isCollapsed)}
           className="rounded-md w-8 h-8"
           variant="outline"
           size="icon"
         >
           <ChevronLeft
             className={cn(
               "h-4 w-4 transition-transform ease-in-out duration-700",
               isCollapsed === false ? "rotate-180" : "rotate-0"
             )}
           />
         </Button>
       </div>
       <div className="flex flex-col h-full py-4">
         <nav className="space-y-2 flex-grow">
           {sidebarLinks.map((link) => (
             <Link href={link.href} key={link.label}>
               <Button variant="ghost" className="w-full justify-start">
                 <link.icon className="h-5 w-5 mr-2" />
                 {!isCollapsed && <span>{link.label}</span>}
               </Button>
             </Link>
           ))}
           {/* <Button variant="ghost" className="w-full justify-start">
             <Settings className="h-5 w-5 mr-2" />
             {!isCollapsed && <span>Settings</span>}
           </Button> */}
         </nav>
       </div>
     </div>
   );
}
