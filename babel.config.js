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
    [require.resolve('babel-plugin-module-resolver'), {
      root: ["./src/"]
    }]
  ],
  "env": {
    "test": {
      "plugins": [
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
}
