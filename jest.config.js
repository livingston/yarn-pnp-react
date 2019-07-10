module.exports = {
  "resolver": require.resolve('jest-pnp-resolver'),
  "moduleNameMapper": {
    '\\.(css|scss|svg)$': 'identity-obj-proxy'
  },
  "moduleFileExtensions": ["js", "jsx"],
  "setupFilesAfterEnv": [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/react/cleanup-after-each"
  ]
};
