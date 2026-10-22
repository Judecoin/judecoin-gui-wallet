const persistConfig = (fs, file, data) =>
  fs.writeFile(file, JSON.stringify(data, null, 4), "utf8");

module.exports = { persistConfig };
