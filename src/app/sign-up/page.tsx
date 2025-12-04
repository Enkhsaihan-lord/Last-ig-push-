"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decodedTokenType, useUser } from "../../providers/AuthProvider";
import { IG_LOGO } from "../icons/ig-logo";
const Page = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [token2, setToken2] = useState("");
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "email") {
      setUserInfo({ ...userInfo, email: value });
    }
    if (name === "password") {
      setUserInfo({ ...userInfo, password: value });
    }
    if (name === "username") {
      setUserInfo({ ...userInfo, username: value });
    }
  };
  const { push } = useRouter();
  const signUp = async () => {
    const response = await fetch("http://localhost:5555/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
      }),
    });
    if (response.ok) {
      console.log("amiltai burtguule nza");
    } else {
      console.log("aldaa garaad bna pizda min");
    }
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      const decodedToken: decodedTokenType = jwtDecode(token);
      setToken2(token);
      console.log(decodedToken.data);
      push(`main-page`);
    }
  };
  return (
    <div className="min-h-screen justify-center flex flex-col items-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-gray-100 py-10 px-4">
      <div className="flex flex-col gap-4 w-80">
        <div className="flex justify-center p-4">
          <IG_LOGO />
        </div>
        <input
          className="border px-3 py-2 rounded"
          placeholder="Email"
          onChange={(e) => {
            handleValue(e);
          }}
          name="email"
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Password"
          onChange={(e) => {
            handleValue(e);
          }}
          name="password"
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Username"
          onChange={(e) => {
            handleValue(e);
          }}
          name="username"
        />
        <button
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={signUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};
export default Page;
