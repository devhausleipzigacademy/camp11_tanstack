import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

async function postBlogPosts(data: { title: string; body: string }) {
  return axios.post("http://localhost:3000/posts", data);
}

function BlogCreate() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postBlogPosts,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/blog");
      toast.success("Blog post created!");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong!");
    },
  });

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formData);
  }

  return (
    <>
      <h1>Create Blog Post</h1>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default BlogCreate;
