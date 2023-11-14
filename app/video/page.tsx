"use client";
import React, { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import Subtitles from "@/components/Subtitles";
import { parseSrt, Subtitle } from "@/utils/parseSrt";
import { CustomInput } from "@/components/CustomInput";

const HomePage: React.FC = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]); 
  const [subtitlesVN, setSubtitlesVN] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(true); 
  const [currentTime, setCurrentTime] = useState(0);
  const [fileList, setFileList] = useState<File[]>([]);
  const [fileListMP4, setFileListMP4] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  
//   useEffect(() => {
//     fetch("/003_Pre-read_Before_You_Read_en.srt")
//       .then((response) => response.text())
//       .then(parseSrt)
//       .then((data) => {
//         // setSubtitles(data);
//         setLoading(false); // Set loading to false after data is loaded
//       });
//   }, []);

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      file.text().then((text) => {
        setSubtitles(parseSrt(text));
      });
    }
  };

  const handleDirectoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
        const sortedFiles = Array.from(files)
        .filter(file => file.name.endsWith('.mp4'))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort files by name
    setFileListMP4(sortedFiles);
      setFileList(Array.from(files));
    }
  };

  const handleFileClick = (file: File) => {
    setSelectedFile(file.name);
    if (file.name.endsWith(".mp4")) {
      setVideoUrl(URL.createObjectURL(file));
      // Auto-select English subtitle file
      const baseName = file.name.replace(".mp4", "");
      console.log(baseName);
      const englishSubtitle = fileList.find(
        (f) => f.name === `${baseName}_en.srt`
      );
      console.log(englishSubtitle);
      if (englishSubtitle) {
        englishSubtitle.text().then((text) => {
            console.log(text);
          setSubtitles(parseSrt(text));
        });
      }
      console.log(englishSubtitle);
      const englishSubtitleVN = fileList.find(
        (f) => f.name === `${baseName}_vi.srt`
      );
      console.log(englishSubtitleVN);
      if (englishSubtitleVN) {
        englishSubtitleVN.text().then((text) => {
            console.log(text);
          setSubtitlesVN(parseSrt(text));
        });
      }
    } else if (file.name.endsWith("en.srt")) {
      file.text().then((text) => {
        setSubtitles(parseSrt(text));
      });
    }else if (file.name.endsWith("vi.srt")) {
        file.text().then((text) => {
          setSubtitlesVN(parseSrt(text));
        });
      }
  };

  const currentSubtitle =
    subtitles.find((sub) => currentTime >= sub.start && currentTime <= sub.end)
      ?.text || "";
  const currentSubtitleVN =
    subtitlesVN.find((sub) => currentTime >= sub.start && currentTime <= sub.end)
      ?.text || "";

  return (
    <div className="flex justify-center h-screen p-4 bg-gray-100">
      <div className="w-full md:w-3/12 bg-gray-100 p-4 border-r-2 border-gray-100">
          <CustomInput
            type="file"
            webkitdirectory=""
            directory=""
            onChange={handleDirectoryChange}
          />

          <div>
            {fileListMP4.map((file, index) => ( 
              <div
                key={index}
                onClick={() => handleFileClick(file)}
                className={`cursor-pointer p-2 m-1 rounded ${
                  file.name === selectedFile
                    ? "bg-blue-200"
                    : "hover:bg-blue-100"
                }`}
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-6/12 bg-white p-4">
          <VideoPlayer
            url={videoUrl}
            playing={true}
            onProgress={handleProgress}
            currentSubtitle={currentSubtitleVN}
          />
        </div>
        <div className="w-full md:w-3/12 bg-slate-200 p-4 overflow-y-auto">
          <Subtitles subtitles={subtitles} currentTime={currentTime} />
        </div>
      </div>
  );
};

export default HomePage;
