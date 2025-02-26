"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary } from "lib/dictionary";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ContentItems } from "../types/types";
import Projects from "./Projects";
import ContactForm from "./contactForm";
import Slider from "./slider";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export const Content = forwardRef(
  (
    {
      params,
      setActiveSection,
    }: {
      params: { lang: "en" | "fa" };
      setActiveSection: (id: string) => void;
    },
    ref
  ) => {
    const sectionRefs = {
      home: useRef<HTMLDivElement>(null),
      about: useRef<HTMLDivElement>(null),
      resume: useRef<HTMLDivElement>(null),
      skills: useRef<HTMLDivElement>(null),
      projects: useRef<HTMLDivElement>(null),
      services: useRef<HTMLDivElement>(null),
      contact: useRef<HTMLDivElement>(null),
    };
    const imageRef = useRef<HTMLImageElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [contentText, setContentText] = useState<ContentItems>({
      about: {
        title: "",
        main: "",
        text: "",
        keys: {
          name: "",
          dob: "",
          address: "",
          email: "",
          phone: "",
        },
        values: {
          name: "",
          dob: "",
          address: "",
          email: "",
          phone: "",
        },
      },
      resume: {
        title: "",
        download: "",
        keys: {
          frontend: "",
          projects: "",
          workExperience: "",
          skills: "",
          softSkills: "",
        },
        values: {
          frontend: "",
          projects: "",
          workExperience: "",
          skills: "",
          softSkills: "",
        },
      },
      skills: {
        title: "",
      },
      projects: {
        title: "",
      },
      services: {
        title: "",
        subtitle: "",
        text: {
          service1: "",
          service2: "",
          service3: "",
          service4: "",
          service5: "",
        },
      },

      contact: {
        title: "",
      },
    });

    const pathname = usePathname();
    const locale = pathname.split("/")[1];
    const direction = locale === "fa" ? "rtl" : "ltr";

    useImperativeHandle(ref, () => ({
      scrollToSection(id: string) {
        const target = sectionRefs[id as keyof typeof sectionRefs]?.current;
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
    }));

    useEffect(() => {
      const fetchDictionary = async () => {
        const dictionary = await getDictionary(params.lang);
        setContentText(dictionary.content);
      };

      fetchDictionary();

      // ui observing
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
          window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop === 0) {
              setActiveSection("home");
            }
          });
        });
      }, observerOptions);

      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });

      // text and ui animations
      const sections = Object.values(sectionRefs).map((ref) => ref.current);

      sections.forEach((section) => {
        if (!section) return;

        const texts = section.querySelectorAll("h1, h2, p, li, form, a");

        gsap.fromTo(
          texts,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          mapRef.current,
          { opacity: 0, y: 75 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => {
        sections.forEach((section) => {
          if (section) ScrollTrigger.getById(section.id)?.kill();
        });

        Object.values(sectionRefs).forEach((ref) => {
          if (ref.current) observer.unobserve(ref.current);
        });
      };
    }, [params.lang]);

    return (
      <>
        <section
          className="sticky z-20 top-[105px] flex flex-col md:flex-row items-center justify-center w-full h-[600px] bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
          id="home"
          ref={sectionRefs.home}
        >
          <div className="w-full pb-3">
            <Slider />
          </div>
        </section>
        <div className="relative z-30 -mt-12 pt-5  rounded-3xl bg-[#f7f6f6] dark:bg-[#000000]">
          <section
            ref={sectionRefs.about}
            className="flex flex-col md:flex-row items-center justify-center h-[100%] pt-10 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="about"
          >
            <div className="min-w-[400px]">
              <Image
                ref={imageRef}
                className="opacity-0 translate-x-[-100px] mb-10"
                src="/images/me.jpg"
                width={400}
                height={450}
                alt="Mehrshad1"
              />
            </div>

            <div
              dir={direction}
              className="w-full md:w-[35%] lg:w-[35%] min-w-[450px] p-10"
            >
              <h1 className="text-6xl font-bold">{contentText.about.title}</h1>
              <h2 className="text-3xl font-bold text-[#1efff4]">
                {contentText.about.main}
              </h2>
              <p className="dark:text-[#ffbd39] md:dark:text-[#ffbd39] font-bold">
                {contentText.about.text}
              </p>
              <div className=" mt-7 rounded-2xl">
                {Object.keys(contentText.about.keys).map((key) => {
                  const typedKey = key as keyof typeof contentText.about.keys;

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between my-2"
                    >
                      <h2 className="font-bold text-3xl dark:text-[#45b8bcf2]">
                        {contentText.about.keys[typedKey]}
                      </h2>
                      <p className="font-bold dark:text-[#ffbd39] text-nowrap px-2">
                        {contentText.about.values[typedKey]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section
            ref={sectionRefs.resume}
            className="flex flex-col md:flex-row items-center  justify-center w-full h-[100%] py-24 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="resume"
          >
            <div dir={direction}>
              <h1 className="text-center text-6xl font-bold">
                {contentText.resume.title}
              </h1>
              <div className="mt-10 rounded-2xl">
                <ol>
                  <div>
                    {Object.keys(contentText.resume.keys).map((key) => {
                      const typedKey =
                        key as keyof typeof contentText.resume.keys;
                      return (
                        <li key={key} className="my-3">
                          <div className="flex items-center">
                            <h2 className="font-bold dark:text-[#45b8bcf2] text-xl mx-2 text-nowrap">
                              {contentText.resume.keys[typedKey]}
                            </h2>
                            <p className="font-bold dark:text-[#ffbd39]">
                              {contentText.resume.values[typedKey]}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </ol>
              </div>
              <div className="flex items-center justify-center mt-20">
                <a
                  className="flex items-center justify-center w-48 h-14 font-extrabold text-[#000000] dark:text-[#ffbd39] drop-shadow-[2px_2px_0_black] bg-[#45b8bcf2] rounded-xl border-4 border-[#000000]  dark:border-[#ffbd39]"
                  href="/resume/Mehrshad-Moradi-CV.pdf"
                  download="Mehrshad-Moradi-Frontend-CV.pdf"
                >
                  {contentText.resume.download}
                </a>
              </div>
            </div>
          </section>
          <section
            ref={sectionRefs.skills}
            className="flex flex-col md:flex-row items-center justify-center w-full h-[680px] pt-28 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="skills"
          >
            <div dir={direction}>
              <h1 className="text-center text-6xl font-bold">
                {contentText.skills.title}
              </h1>
              <div className="flex items-center justify-center mt-20">
                <img
                  src="https://skillicons.dev/icons?i=html,css,bootstrap,tailwind,javascript,ts,less,react,nextjs,git,github,bitbucket,gitlab,angular,reactivex,docker,figma,materialui,jenkins,npm,redux,regex,stackoverflow,vite,vscode,express&perline=13"
                  alt="My Skills"
                ></img>
              </div>
            </div>
          </section>
          <section
            ref={sectionRefs.projects}
            className="flex flex-col md:flex-row items-center  justify-center w-full h-[100%] py-20 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="projects"
          >
            <div className="flex-1">
              <h1 className="text-center text-6xl font-bold mb-10">
                {contentText.projects.title}
              </h1>

              <Projects params={params} />
            </div>
          </section>
          <section
            ref={sectionRefs.services}
            className="flex flex-col md:flex-row items-center  justify-center w-full h-[650px] pt-20 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="services"
          >
            <div className="flex-1" dir={direction}>
              <h1 className="text-center text-6xl font-bold">
                {contentText.services.title}
              </h1>
              <h2 className="text-center text-3xl font-bold dark:text-[#ffbd39] md:dark:text-[#ffbd39]">
                {contentText.services.subtitle}
              </h2>
              <div className="flex items-center justify-center mt-20">
                <ol className="rounded-2xl">
                  {Object.values(contentText.services.text).map(
                    (service, index) => {
                      return (
                        <li key={index} className="mt-5">
                          <p className="dark:text-[#ffbd39] md:dark:text-[#ffbd39] font-bold">
                            {service}
                          </p>
                        </li>
                      );
                    }
                  )}
                </ol>
              </div>
            </div>
          </section>

          <section
            ref={sectionRefs.contact}
            className="flex flex-col md:flex-row items-center justify-center w-full h-[100%] pt-20 px-5 bg-[#f7f6f6] dark:bg-[#000000] overflow-hidden"
            id="contact"
          >
            <div>
              <h1 className="text-center text-6xl font-bold">
                {contentText.contact.title}
              </h1>

              <div className="flex flex-col md:flex-row m-10 rounded-2xl">
                <div
                  ref={mapRef}
                  id="map"
                  className="w-[350px] h-[430px] rounded-lg border-2 m-2"
                >
                  <Map />
                </div>
                <div className="m-2">
                  <ContactForm params={params} direction={direction} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row mt-10 lg:flex-row gap-4">
                <div className="m-2">
                  <a
                    href="https://github.com/mehrshadmoradi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/github.png"
                      alt="github"
                      width={30}
                      height={30}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                    <p
                      id="github"
                      className="mx-1 dark:text-[#ffbd39] md:dark:text-[#ffbd39]"
                    >
                      Github
                    </p>
                  </a>
                </div>
                <div className="m-2">
                  <a
                    href="https://www.linkedin.com/in/mehrshadmoradi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/linkedin.png"
                      alt="linkedin"
                      width={30}
                      height={30}
                    />
                    <p
                      id="linkedin"
                      className="mx-1 dark:text-[#ffbd39] md:dark:text-[#ffbd39]"
                    >
                      LinkedIn
                    </p>
                  </a>
                </div>
                <div className="m-2">
                  <a
                    href="https://www.youtube.com/@reallmehrshad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/youtube.png"
                      alt="linkedin"
                      width={30}
                      height={30}
                    />
                    <p
                      id="youtube"
                      className="mx-1 dark:text-[#ffbd39] md:dark:text-[#ffbd39]"
                    >
                      Youtube
                    </p>
                  </a>
                </div>
                <div className="m-2">
                  <a
                    href="mailto:mehrshadmoradi2079@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/gmail.png"
                      alt="gmail"
                      width={30}
                      height={30}
                    />
                    <p
                      id="gmail"
                      className="mx-1 dark:text-[#ffbd39] md:dark:text-[#ffbd39]"
                    >
                      mehrshadmoradi2079@gmail.com
                    </p>
                  </a>
                </div>
                <div className="m-2">
                  <a
                    href="tel:09909066113"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="/images/call.png"
                      alt="call"
                      width={30}
                      height={30}
                    />
                    <p
                      id="call"
                      className="mx-1 dark:text-[#ffbd39] md:dark:text-[#ffbd39]"
                    >
                      call me
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
);

Content.displayName = "Content";
export default Content;
