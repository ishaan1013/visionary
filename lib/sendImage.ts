export const sendImage = async (theme: string, blob: any) => {
  try {
    blob = await blob.arrayBuffer();
    const view = new Uint8Array(blob);
    const res = await fetch("http://127.0.0.1:5000/api/text_from_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blob: view,
        theme: theme,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
