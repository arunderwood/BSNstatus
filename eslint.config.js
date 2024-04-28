import js from "@eslint/js";
import html from "eslint-plugin-html";

export default [
    {
        files: ["**/*.js"],
        rules: js.configs.recommended.rules
    },
    {
        "plugins": {
            html: html
        },
        files: ["**/*.html"],
    },
]
