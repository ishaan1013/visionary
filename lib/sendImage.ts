export const sendImage = async (theme: string, blob: Blob) => {
  try {
    const buffer = await blob.arrayBuffer();
    const view = new Uint8Array(buffer);
    const res = await fetch(
      "http://https://visionary-backend-px6z5q8n9-ryan-zhu-music.vercel.app/api/text_from_image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blob: view,
          theme: theme,
        }),
      },
    );
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
