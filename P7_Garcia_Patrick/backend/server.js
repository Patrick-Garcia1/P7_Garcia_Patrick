//----------------------------------------------------------------------------------
// Serveur
//----------------------------------------------------------------------------------
const http = require("http");
const app = require("./app");
//----------------------------------------------------------------------------------
// GARDE CORP SECURITE
//----------------------------------------------------------------------------------
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
//----------------------------------------------------------------------------------
// DIPLOMATIE DES ERREURS
//----------------------------------------------------------------------------------
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.error(error);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(error);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//----------------------------------------------------------------------------------
// SERVEUR
//----------------------------------------------------------------------------------
const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  console.log(
    "Listening on port " +
      process.env.PORT +
      "(FR)écoute sur le port " +
      process.env.PORT
  );
});

server.listen(port);
