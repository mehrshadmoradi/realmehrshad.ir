"use client";

import { use, useRef, useState } from "react";
import { ContentRef } from "./types/types";
import { Content } from "./components/content";
import { Locale } from "i18next.config";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Menu from "./components/menu";
import React from "react";

export default function App({ params }: { params: Promise<{ lang: Locale }> }) {
  const contentRef = useRef<ContentRef>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleMenuItemClick = (id: string) => {
    setActiveSection(id);
    contentRef.current?.scrollToSection(id);
  };
  const lang = use(params);

  return (
    <>
      <Provider store={store}>
        <div>
          <div className="fixed top-0 left-0 w-full z-50">
            <Menu
              scrollToSection={handleMenuItemClick}
              params={lang}
              activeSection={activeSection}
            />
          </div>
          <div className=" bg-[#f7f6f6] dark:bg-[#000000] w-full py-[105px]">
            <Content
              ref={contentRef}
              params={lang}
              setActiveSection={setActiveSection}
            />
          </div>
        </div>
      </Provider>
    </>
  );
}
