export default {
  '**/*': 'prettier --write --ignore-unknown',
  '.husky/*': 'prettier --write --parser=sh',
  'projects/**/*.{js,ts,html}': 'eslint',
  '.all-contributorsrc': 'prettier --write --parser=json',
  '.prettierrc': 'prettier --write --parser=json',
};
