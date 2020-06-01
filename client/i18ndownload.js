const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const zh = {},
    en = {};

const write = (lang, data) => {
    const _path = path.join(
        __dirname,
        "./static/locales/" + lang + "/common.json"
    );
    fs.writeFileSync(_path, JSON.stringify(data));
};

const getI18nData = () => {
    fetch("http://127.0.0.1:8000/api/i18ns")
        .then(res => res.json())
        .then(data => {
            data.data.rows.forEach(item => {
                zh[item.id] = item["zh"];
                en[item.id] = item["en"];
            });
            write("zh", zh);
            write("en", en);
        });
};

getI18nData();
