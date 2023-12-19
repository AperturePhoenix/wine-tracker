module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'import/no-absolute-path': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["vite.config.ts", "**/*.spec.js"]}],
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/require-default-props": "off"
  },
}
