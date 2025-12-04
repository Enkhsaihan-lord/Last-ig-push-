"use client";

import { Button } from "../../components/ui/button";
import { User, useUser } from "../../providers/AuthProvider";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Profile } from "../icons/defaultProfile";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";
type PostType = {
  _id: string;
  images: string[];
  caption: string;
  like: string[];
  user: {
    bio: string;
    email: string;
    followers: string[];
    following: string[];
    password: string;
    username: string;
    _id: string;
    user: User;
  };
};

const Page = () => {
  const [post, setPost] = useState<PostType[]>([]);

  const { token } = useUser();

  const { push } = useRouter();
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5555/allPost", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const res = await response.json();
      setPost(res);
    }
  };

  const pushToProfile = (userId: string) => {
    push(`/profile/${userId}`);
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  } , [token]);
  const clickLike = async (postId: string) => {
    const response = await fetch(`http://localhost:5555/postLike/${postId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("Like/unlike successful");
      fetchPosts();
    } else {
      console.log("Failed to like/unlike");
    }
  };
  const followUser = async (followedUserId: string) => {
    const response = await fetch(
      `http://localhost:5555/follow-toggle/${followedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      console.log("success");
    } else {
      console.log("GG");
    }
  };
  console.log(post, "buh data");
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-gray-100 py-10 px-4">
      {post.map((postData, index) => (
        <div key={index}>
          <div className="flex gap-1 p-1">
            <Profile />
            <div
              className="mt-2 ml-1.5"
              onClick={() => pushToProfile(postData.user._id)}
            >
              {postData.user?.username}
            </div>
            <Button className="" onClick={() => followUser(postData.user._id)}>
              Follow
            </Button>
          </div>

          <img src={postData.images[0]} alt="Post image" />

          <div className="flex gap-2">
            <Heart
              onClick={() => clickLike(postData._id)}
              className="cursor-pointer"
              color="red"
              fill="red"
            />
            <MessageCircle
              onClick={() => {
                push(`comment`);
              }}
            />
          </div>

          <div>{postData.like.length}</div>
          <div className="font-black m-2">likes</div>
          <div className="font-black">{postData.caption}</div>
          <div>View all 2 comments</div>
          <div>Add a comment...</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
