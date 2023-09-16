"use client";

import { useEffect } from "react";

export default function TestReq() {
  const sendImage = async () => {
    try {
      const blob: any = await fetch("/sample1.jpg", { method: "GET" }).then(
        (res) => res.blob().then((blob) => blob.arrayBuffer()),
      );

      const view = new Uint8Array(blob);
      const res = await fetch("http://127.0.0.1:5000/api/text_from_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blob: view,
          theme: "music history",
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendImage();
  }, []);

  return null;
}
