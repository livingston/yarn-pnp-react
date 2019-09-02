module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "ie 11"
        ]
      },
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": {
        "version": 3,
        "proposals": true
      },
      "exclude": [
        "transform-typeof-symbol"
      ]
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    "macros",
    "react-hot-loader/babel",
    "jsx-control-statements",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    [require.resolve('babel-plugin-module-resolver'), {
      root: ["./src/"]
    }]
  ],
  "env": {
    "test": {
      "plugins": [
        "dynamic-import-node",
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
}
