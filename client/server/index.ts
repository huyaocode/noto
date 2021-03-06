import next from "next";
import express from "express";
import path from "path";
import nextI18NextMiddleware from "next-i18next/middleware";
import nextI18next from "./i18n";
import routes from "./routes";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

// 代理 - 接口转发到 API Server
const devProxy: { [key: string]: {} } = {
    "/api": {
        target: process.env.PROXY_ORIGIN,
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
    },
};

app.prepare().then(() => {
    const server = express();

    app.setAssetPrefix(process.env.STATIC_PATH);
    server.use(express.static(path.join(__dirname, "../static")));
    server.use(nextI18NextMiddleware(nextI18next));

    if (process.env.PROXY_MODE === "local") {
        // eslint-disable-next-line global-require
        const proxyMiddleware = require("http-proxy-middleware");
        Object.keys(devProxy).forEach(context => {
            server.use(proxyMiddleware(context, devProxy[context]));
        });
    }

    server.get("*", (req, res) => handler(req, res));

    server.listen(port);

    // eslint-disable-next-line no-console
    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? "development" : process.env.NODE_ENV
        }`
    );
});
