// generateSongs.js
const fs = require("fs");
const path = require("path");

const SONGS_DIR = path.join(__dirname, "songs");
const outputFile = path.join(__dirname, "musicData.js");

const music = {};

fs.readdirSync(SONGS_DIR).forEach(folder => {
  const folderPath = path.join(SONGS_DIR, folder);

  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath);

    const songs = files.filter(file =>
      file.endsWith(".mp3") || file.endsWith(".m4a")
    );

    if (songs.length > 0) {
      music[folder] = songs;
    }
  }
});

const output =
`// AUTO-GENERATED FILE (do not edit manually)
const MUSIC = ${JSON.stringify(music, null, 2)};
`;

fs.writeFileSync(outputFile, output);

console.log("✅ musicData.js generated successfully");
