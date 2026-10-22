const { spawnSync } = require("child_process");
const path = require("path");

const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const files = process.argv.slice(2);

if (files.length === 0) {
  throw new Error("Pass at least one WebM file to check");
}

for (const file of files) {
  const result = spawnSync(
    ffmpeg,
    [
      "-v",
      "error",
      "-c:v",
      "libvpx-vp9",
      "-ss",
      "1",
      "-i",
      file,
      "-frames:v",
      "1",
      "-pix_fmt",
      "rgba",
      "-f",
      "rawvideo",
      "pipe:1"
    ],
    { maxBuffer: 8 * 1024 * 1024 }
  );

  if (result.error) {
    throw new Error(`Unable to run media checker: ${ffmpeg}`);
  }

  if (result.status !== 0) {
    throw new Error(
      (result.stderr && result.stderr.toString()) || `Could not decode ${file}`
    );
  }

  const pixels = result.stdout;
  const pixelCount = pixels.length / 4;
  const side = Math.sqrt(pixelCount);

  if (!Number.isInteger(side)) {
    throw new Error(`Unexpected frame size for ${file}`);
  }

  const alphaAt = (x, y) => pixels[(y * side + x) * 4 + 3];
  const cornerAlpha = [
    alphaAt(0, 0),
    alphaAt(side - 1, 0),
    alphaAt(0, side - 1),
    alphaAt(side - 1, side - 1)
  ];
  let visiblePixels = 0;

  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] > 32) visiblePixels += 1;
  }

  if (cornerAlpha.some(alpha => alpha > 8)) {
    throw new Error(
      `${path.basename(
        file
      )} has an opaque background: corner alpha ${cornerAlpha.join(", ")}`
    );
  }

  if (visiblePixels < pixelCount * 0.03) {
    throw new Error(
      `${path.basename(file)} lost its visible animation content`
    );
  }

  console.log(
    `${path.basename(
      file
    )}: transparent corners, ${visiblePixels} visible pixels`
  );
}
