/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cva'],
  printWidth: 100, // 라인 별 최대 너비
  tabWidth: 2, // 들여쓰기 너비
  useTabs: false, // 들여쓰기를 탭으로 사용할지 여부
  semi: true, // 세미콜론 사용
  singleQuote: true, // 따옴표를 홑따옴표로 사용할지 여부
  quoteProps: 'as-needed', // 객체 리터럴의 프로퍼티에 따옴표를 사용하는 방식
  jsxSingleQuote: false, // JSX에서 따옴표를 홑따옴표로 사용할지 여부
  trailingComma: 'all', // 여러 줄로 걸쳐 있을 때 후행 콤마를 사용하는 방식
  bracketSpacing: true, // 객체 리터럴의 중괄호 사이에 공백을 사용할지 여부
  objectWrap: 'preserve', // 객체 리터럴이 짧을 때 프로퍼티 나열에 줄바꿈을 사용할지 여부
  bracketSameLine: false, // 여러 줄로 쓴 HTML/JSX 태그에서 닫힘 꺾쇠(>)를 같은 줄에 사용할지 여부
  arrowParens: 'always', // 화살표 함수의 매개변수가 하나일 때 매개변수를 항상 괄호로 감쌀지 여부
  proseWrap: 'preserve', // 프로젝트 내 마크다운 파일에서 printWidth를 초과할 때 줄바꿈을 사용할지 여부
  endOfLine: 'auto', // 라인 끝에 사용할 개행 문자의 처리 방식
};
