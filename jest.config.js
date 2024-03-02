const {defaults: tsjPreset} = require("ts-jest/presets");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        //   "^lodash-es(/(.*)|$)": "lodash$1",
        //   "^nanoid(/(.*)|$)": "nanoid$1",
        "^.+\\.(css|less)$": "<rootDir>/config/style-mock.js",
    },
    modulePathIgnorePatterns: ["<rootDir>/node_modules", "node_modules"],

    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFiles: ["<rootDir>/config/jest.setup.js"],
    setupFilesAfterEnv: ["<rootDir>/test/setup"],
};
