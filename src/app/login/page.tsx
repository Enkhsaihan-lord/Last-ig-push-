"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodedTokenType, useUser } from "../../providers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { IG_LOGO } from "../icons/ig-logo";

const Page = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "email") {
      setInfo({ ...info, email: value });
    }
    if (name === "password") {
      setInfo({ ...info, password: value });
    }
  };
  const login = async () => {
    const response = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
      }),
    });
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      const decodedToken: decodedTokenType = jwtDecode(token);
      setToken(token);
      console.log(decodedToken.data);
      push(`main-page`);
    }
  };

  useEffect(() => {
    login();
  }, []);

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

        <button
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-500"
          onClick={login}
        >
          Log in
        </button>
      </div>
    </div>
  );
};
export default Page;
