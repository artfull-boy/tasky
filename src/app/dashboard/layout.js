"use client";
import NavLink from "../../components/ui/NavLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
  const currentPath = usePathname();
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/projects", label: "Projects" },
    { href: "/dashboard/tasks", label: "All Tasks" },
    { href: "/dashboard/my_tasks", label: "My Tasks" },
    { href: "/dashboard/users", label: "Users" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="border-b border-accent">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href="/dashboard">
                  <Image
                    src={"/logo.png"}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    active={currentPath === link.href} // Compare currentPath with href
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center text-sm">
                Username <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
