const { create } = require("domain");
const fs = require("fs");
const path = require("path");

console.log(__dirname);

const basePath = "./client";

const getHTMLContent = (pageName) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageName}</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body><h1>${pageName}</h1>
</body>
</html>`;
};

function getRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

const getCSSContent = (color) => {
  return `body {background-color: ${color}; min-height: 100svh}`;
};

const createBaseFiles = (folderPath) => {
  const pageName = folderPath.split("/").pop();
  fs.writeFileSync(
    path.join(folderPath, "index.html"),
    getHTMLContent(pageName)
  );
  fs.writeFileSync(
    path.join(folderPath, "style.css"),
    getCSSContent(getRandomRGB)
  );
};

const addToBasePath = (newFolderName) => {
  const newPath = path.join(basePath, newFolderName);
  fs.mkdirSync(newPath);
  createBaseFiles(newPath);
};

const createFileStructure = () => {
  if (fs.existsSync(basePath)) {
    fs.rm(basePath, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${basePath} is deleted!`);
    });
  }
  try {
    fs.mkdirSync(basePath);
    createBaseFiles(basePath);

    addToBasePath("contact");
    addToBasePath("about");
    addToBasePath("blog");
  } catch (error) {
    console.log(error.message);
  }
};

createFileStructure();
