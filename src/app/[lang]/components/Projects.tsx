"use client";
import { getDictionary } from "lib/dictionary";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IProjectDescriptions } from "../types/types";

export default function Projects({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(
    null
  );

  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const direction = locale === "fa" ? "rtl" : "ltr";

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [projectText, setProjectText] = useState<IProjectDescriptions>({
    todo: "",
    weatherApp: "",
    khashimelk: "",
  });

  const videos = [
    {
      title: "todo app",
      description: projectText.todo,
      url: "/videos/todo.mp4",
    },
    {
      title: "weather app",
      description: projectText.weatherApp,
      url: "/videos/weather-app.mp4",
    },
    {
      title: "khashimelk",
      description: projectText.khashimelk,
      url: "/videos/Khashimelk.mp4",
    },
  ];

  const handlePlay = (index: number) => {
    if (currentVideo && currentVideo !== videoRefs.current[index]) {
      currentVideo.pause();
    }
    setCurrentVideo(videoRefs.current[index] || null);
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(params.lang);
      setProjectText(dictionary.content.project.descriptions);
    };

    fetchDictionary();
  }, [params.lang]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {videos.map((video, index) => (
        <div
          key={index}
          className="flex flex-col justify-between p-5 rounded-xl bg-[#a8a69b4e] min-w-[350px] w-[380px] h-[500px] m-3 hrounded-2xl border-4 border-[#37f046] dark:border-[#ffbd39]"
        >
          <h2 className="flex items-center justify-center text-2xl font-bold">
            {video.title}
          </h2>
          <div className="flex items-center justify-center">
            <p dir={direction} className="font-bold">
              {video.description}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <video
              className="border-4 border-[#37f046] dark:border-[#ffbd39] rounded-xl"
              controls
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              onPlay={() => handlePlay(index)}
            >
              <source src={video.url} type="video/mp4" />
            </video>
          </div>
        </div>
      ))}
    </div>
  );
}
