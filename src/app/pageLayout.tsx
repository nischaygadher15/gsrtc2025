"use client";

import DefaultNavbar from "@/components/common/DefaultNavbar";
import FooterNavbar from "@/components/common/FooterNavbar";
import FooterSection from "@/components/common/FooterSection";
import React, { useState } from "react";

const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userAccDrawer, setUserAccDrawer] = useState<boolean>(false);
  return (
    <>
      <DefaultNavbar accDrawer={{ userAccDrawer, setUserAccDrawer }} />
      {children}
      <FooterSection />
      <FooterNavbar accDrawer={{ userAccDrawer, setUserAccDrawer }} />
    </>
  );
};

export default PageLayout;
