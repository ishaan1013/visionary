export const sendImage = async (imageSrc: Uint8Array, theme: string) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/text_from_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blob: imageSrc,
        theme: theme,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};
