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
    "plugin:import/errors"
  ],
  "settings": {
    "import/resolver": {
      [require.resolve('./scripts/eslint-resolver.js')]: {},
      "babel-module": {}
    }
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
    }]
  }
};
