"use client";
import { NextResponse } from "next/server";
import { upload } from "@vercel/blob/client";
import { Images } from "lucide";
import { ChangeEvent, useState } from "react";
import { useUser } from "../../providers/AuthProvider";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("");
  const [caption, setCaptionValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const HF_API_KEY = process.env.HF_API_KEY;

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const captionHandle = (a: ChangeEvent<HTMLInputElement>) => {
    const { value } = a.target;
    setCaptionValue(value);
  };

  const { token } = useUser();
  console.log(inputValue);
  const aigenerate = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    setImage("");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_API_KEY}`,
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const blob = await response.blob();

      const file = new File([blob], "generated.png", { type: "image/png" });

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      setImage(uploaded.url);
    } catch (err) {
      setIsLoading(false);
    }
    console.log(image);
  };
  const reqPost = async () => {
    const response = await fetch("http://localhost:5555/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: caption,
        images: [image],
      }),
    });
    console.log(response, "res shu");
    if (response.ok) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };
  console.log(caption, "qwe");
  console.log(image, "qwe");
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-gray-100 py-10 px-4">
      <div className="text-5xl text-black-600 p-2">
        Explore AI generate Images
      </div>
      <div className="flex gap-2 ">
        <input
          className=" flex p-2 font-black"
          placeholder="value"
          onChange={(e) => {
            handleValue(e);
          }}
        />
        <button className="font-black" onClick={aigenerate}>
          generate
        </button>
      </div>
      <img src={image || undefined} className="w-100 h-100    "></img>
      <input
        className=" flex p-2 font-blac p-2"
        placeholder="caption"
        onChange={(a) => captionHandle(a)}
      />
      <div className="flex">
        <button className="flex p-2 font-black" onClick={reqPost}>
          create post
        </button>
      </div>
    </div>
  );
};

export default Page;
