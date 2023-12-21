import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCreate from "./BlogCreate";
import { Link } from "react-router-dom";

export type BlogPost = {
  id: number;
  title: string;
  body: string;
};

async function getBlogPosts() {
  const { data } = await axios.get<BlogPost[]>(" http://localhost:3000/posts");
  return data;
}

function Blog() {
  const {
    data: blogPosts,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getBlogPosts,
    initialData: [],
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 15,
  });

  console.log(isLoading);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error:</div>}
      {blogPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <Link to={`/blog/${post.id}`}>read more</Link>
        </div>
      ))}
      <BlogCreate />
    </div>
  );
}

export default Blog;
