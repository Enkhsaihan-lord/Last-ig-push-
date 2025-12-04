"use client";

import { useState, useEffect } from "react";
import { House } from "lucide-react";

import { User, useUser } from "../../providers/AuthProvider";
const Page = () => {
  const [saveComment, setSaveComment] = useState("");
  const { token } = useUser();
  const fetchComment = async () => {
    const comment = async () => {
      const response = await fetch("http://localhost:5555/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setSaveComment(res);
      }
    };
  };
  useEffect(() => {
    if (token) {
      Page();
    }
  }, [token]);
  return (
    <div>
      <p className="flex justify">Comment</p>
    </div>
  );
};
export default Page;
