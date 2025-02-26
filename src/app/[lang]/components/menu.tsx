import { getDictionary } from "lib/dictionary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuItems } from "../types/types";
import LanguageSwitcher from "./languageswitcher";
import { ModeToggle } from "./mode-toggle";

export default function Menu({
  scrollToSection,
  activeSection,
  params,
}: {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  params: { lang: "en" | "fa" };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuLang, setMenuLang] = useState<MenuItems>({
    name: "",
    home: "",
    about: "",
    resume: "",
    skills: "",
    projects: "",
    services: "",
    contact: "",
  });

  const handleMenuClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(params.lang);
      setMenuLang(dictionary.menu);
    };

    fetchDictionary();
  }, [params.lang]);
  return (
    <>
      <nav className=" bg-[#f3f3f3] md:bg-[#f3f3f3] dark:bg-[#000000] shadow-md shadow-slate-400 md:dark:bg-[#000000]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="/images/me.jpg"
              width={50}
              height={50}
              alt="Mehrshad"
              style={{ borderRadius: "50%" }}
            />
            <span className="flex items-center justify-center text-2xl w-32 font-semibold whitespace-nowrap hover:text-[#37f046] dark:text-white  dark:hover:text-[#ffbd39] md:dark:hover:text-[#ffbd39]">
              {menuLang.name}
            </span>
            <span className=" text-2xl font-semibold whitespace-nowrap rounded-md border-[1px] border-[#000000] hover:text-[#37f046] dark:border-white dark:text-white  dark:hover:text-[#ffbd39] md:dark:hover:text-[#ffbd39]">
              <ModeToggle />
            </span>

            <span className=" text-2xl font-semibold whitespace-nowrap rounded-md border-[1px] border-[#000000] hover:text-[#37f046] dark:border-white dark:text-white  dark:hover:text-[#ffbd39] md:dark:hover:text-[#ffbd39] ">
              <LanguageSwitcher />
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#f3f3f3]  dark:bg-[#000000] md:dark:bg-[#000000] dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "home"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                  aria-current="page"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {menuLang.home}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenuClick("about");
                  }}
                  href="#about"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "about"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.about}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenuClick("resume");
                  }}
                  href="#resume"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "resume"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.resume}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenuClick("skills");
                  }}
                  href="#skills"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "skills"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.skills}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenuClick("projects");
                  }}
                  href="#projects"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "projects"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.projects}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenuClick("services");
                  }}
                  href="#services"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "services"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.services}
                </a>
              </li>

              <li>
                <a
                  onClick={() => {
                    handleMenuClick("contact");
                  }}
                  href="#contact"
                  className={`relative block py-2 px-3 h-8 text-[#000000] dark:text-white  
                              transition-all duration-300 ease-in-out 
                              hover:text-[#37f046] dark:hover:text-[#ffbd39] 
                              hover:bg-gray-100 md:hover:bg-transparent md:p-0 
                              dark:hover:bg-gray-700 md:dark:hover:bg-transparent 
                              before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] 
                              before:bg-[#37f046] dark:before:bg-[#ffbd39] 
                              before:transition-all before:duration-300 before:ease-in-out 
                              before:-translate-x-1/2 
                              hover:before:w-full
                    ${
                      activeSection === "contact"
                        ? " before:w-full before:left-0 before:bg-[#37f046] dark:before:bg-[#ffbd39] dark:text-[#ffbd39]"
                        : ""
                    }`}
                >
                  {menuLang.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
