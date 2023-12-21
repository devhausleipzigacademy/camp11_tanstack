import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { type BlogPost } from "./Blog";

async function getSinglePost(id: string) {
  const { data } = await axios.get<BlogPost>(
    `http://localhost:3000/posts/${id}`
  );
  return data;
}

function SinglePost() {
  const { id } = useParams<{ id: string }>();
  const {
    isError,
    error,
    isLoading,
    data: singlePost,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => await getSinglePost(id!),
  });

  return (
    <div>
      <h1>{singlePost?.title}</h1>
      <p>{singlePost?.body}</p>
    </div>
  );
}

export default SinglePost;
