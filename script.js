//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const downloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => resolve(image);
    image.onerror = () => reject("Download failed");
  });
};

const downloadImages = () => {
  output.innerHTML="";
  const loadingDiv = document.createElement("div");
  loadingDiv.setAttribute("id", "loading");
  loadingDiv.textContent = "Loading...";
  document.body.prepend(loadingDiv);

  const downloadPromises = images.map((imageData) =>
    downloadImage(imageData?.url)
  );
  Promise.all(downloadPromises)
    .then((data) => {
      loadingDiv.remove();
      data.forEach((img) => {
        output.append(img);
      });
    })
    .catch((error) => {
      loadingDiv.remove();
      const errorDiv = document.createElement("div");
      errorDiv.setAttribute("id", "error");
      errorDiv.textContent = "Image download filed";
      document.body.prepend(errorDiv);
    });
};