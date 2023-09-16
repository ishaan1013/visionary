export const sendImage = async (
  imageSrc: string | null,
  theme: string,
  desc: string,
) => {
  try {
    const byteCharacters = atob(imageSrc?.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const res = await fetch("http://127.0.0.1:5000/api/text_from_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blob: byteArray,
        theme: theme,
        desc: desc,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};
