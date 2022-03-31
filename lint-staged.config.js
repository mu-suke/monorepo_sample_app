module.exports = {
  "web/**/*.{js,ts,tsx}": (files) =>
    `npm run lint:precommit --prefix ./web -- ${checkFiles(files).join(" ")}`,
  "api/**/*.{js,ts}": "npm run lint:precommit --prefix ./api",
  "web/**/*.{js,jsx,ts,tsx,json,gql}": (files) =>
    `npm run fmt:precommit --prefix ./web -- ${checkFiles(files).join(" ")}`,
  "api/**/*.{js,jsx,ts,tsx,json}": "npm run fmt:precommit --prefix ./api",
};

/**
 * 自動生成ファイルは対象外にしてeslintやprettierへ渡す
 * https://github.com/okonet/lint-staged#example-ignore-files-from-match
 */
const checkFiles = (files) =>
  files.filter(
    (f) =>
      !f.includes("web/src/generated/graphql.tsx") &&
      !f.includes("web/graphql.schema.json")
  );
