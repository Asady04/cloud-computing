"use client";
import React, { useEffect, useState } from "react"; // Import React dan hooks
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import Image from "next/image";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation"; // Import useRouter
import { fetchUserData, logout } from "@/services/authService";
import { auth } from "@/firebaseConfig";

export const Navbar = () => {
  const router = useRouter(); // Initialize router
  interface UserData {
    name: string;
    email: string;
    nim: string;
    role: string;
  }

 // Initialize state with data from localStorage (if available)
 const [userData, setUserData] = useState<UserData | null>(() => {
  const savedUserData = localStorage.getItem("userData");
  return savedUserData ? JSON.parse(savedUserData) : null;
});

// Fetch user data from backend or Firebase when the component mounts
useEffect(() => {
  const getUserData = async () => {
    try {
      const data = await fetchUserData();
      if (data != null) {
        const userr: UserData = {
          name: data.name,
          email: data.email,
          nim: data.nim,
          role: data.role,
        };
        setUserData(userr);
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!userData) {
    getUserData(); // Only fetch if no userData is already present
  }
}, [userData]);

const handleLogout = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await logout();
    localStorage.removeItem("userData"); // Clear localStorage on logout
    router.push("/login");
  } catch (err) {
    console.error("Error logging out:", err);
  }
};

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  console.log("auth: ", auth)
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src="/apexlogo.webp"
              width={35}
              height={35}
              alt="kapan predator"
            />
            <p className="font-bold text-red-800 dark:text-red-300 text-inherit">
              Kelompok 3
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <div className="flex justify-between gap-3 items-center">
            <div className="items-center text-default-700 text-right">
              {userData ? ( // Tampilkan nama jika data ada
                <>
                  <p className="font-semibold">Hey, {userData.name}</p>
                </>
              ) : (
                <p className="font-semibold">Hey, User</p> // Tampilkan default jika belum ada data
              )}
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Avatar size="md" src="/user-avatar-happy.svg" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <div>
                    {userData ? ( // Tampilkan informasi pengguna jika data ada
                      <>
                        <p className="font-semibold">{userData.name}</p>
                        <p className="text-sm">{userData.email}</p>
                        {userData.role == "admin" ? (
                          <p className="text-sm font-semibold text-red-800">
                            {userData.role}
                          </p>
                        ) : (
                          <div>
                            <p className="text-sm">{userData.nim}</p>
                            <p className="text-sm font-semibold text-green-800">
                              {userData.role}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">User</p>
                        <p className="text-sm">user@example.com</p>
                        <p className="text-sm">NIM</p>
                      </>
                    )}
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  onClick={handleLogout} // Tambahkan event handler untuk logout
                >
                  <div className="flex gap-1 items-center">
                    <p>Log Out</p>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
