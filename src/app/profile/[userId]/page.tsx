"use client";
import { useState, useEffect } from "react";
import { useUser } from "../../../providers/AuthProvider";
import { useParams } from "next/navigation";
import { UserRound } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

type UserDataType = {
  username: string;
  following: string[];
  followers: string[];
  posts: string;
};
type PostType = {
  images: string[];
};
const Page = () => {
  const [proPost, setProPost] = useState<PostType[]>([]);
  const [userData, setUserData] = useState<UserDataType>();
  const { token } = useUser();
  const params = useParams();
  const userId = params.userId;

  const Data = async () => {
    const response = await fetch(
      `http://localhost:5555/profileData/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorzition: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const res = await response.json();
      setUserData(res);
    }
  };

  const userPost = async () => {
    const response = await fetch(`http://localhost:5555/userPost/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      setProPost(res);
    }
  };

  useEffect(() => {
    if (token) {
      userPost();
      Data();
    }
  }, [token]);
  console.log(proPost);
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {<div className="text-xl font-black">{userData?.username}</div>}
        </div>
        <Button>Edit profile</Button>
        <div className="">
          <div>{userData?.following.length}</div>
          <div>following</div>
        </div>
        <div className="">
          {<div>{userData?.followers.length}</div>}
          <div>followers</div>
        </div>
        <div>{<div>{}</div>}</div>
      </div>
      <div className="flex gap-1.5 ml-7">
        {proPost.map((post, index) => {
          return (
            <div key={index}>
              <img src={post?.images?.[0]} className=" h-30 w-30 "></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
