const path = require('path');

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:import/errors",
    "plugin:jsx-control-statements/recommended"
  ],
  "plugins": [
    "react-hooks",
    "jsx-control-statements"
  ],
  "settings": {
    "import/resolver": {
      [require.resolve('./scripts/eslint-resolver.js')]: {},
      "babel-module": {}
    },
  },
  "rules": {
    "comma-dangle": [
      "error",
      "never"
    ],

    "react/jsx-filename-extension": [1, {
      "extensions": [
        ".js",
        ".jsx"
      ]
    }],
    "react/jsx-wrap-multilines": 0,
    "react/jsx-closing-tag-location": 0,
    "react/jsx-no-undef": [2, { "allowGlobals": true }],

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
