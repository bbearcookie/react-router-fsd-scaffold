import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import configPrettier from 'eslint-config-prettier/flat';
import fsdPlugin from 'eslint-plugin-fsd-lint';

export default defineConfig(
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/.react-router/**',
    '**/storybook-static/**',
    '**/pnpm-lock.yaml',
    '**/*.config.{js,ts}',
    '**/*.d.ts',
    '**/public/**',
    '**/locales/**',
  ]),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      pluginPromise.configs['flat/recommended'],
      configPrettier,
      eslintPluginPrettierRecommended,
    ],

    plugins: {
      fsd: fsdPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs', '*.cjs', '*.ts', '*.tsx'],
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json'],
          tsconfigRootDir: import.meta.dirname,
          alwaysTryTypes: true,
        },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      // ----- React -----
      'react/react-in-jsx-scope': 'off', // import React from 'react' 가 필요한지의 여부
      'react-refresh/only-export-components': 'warn', // 리액트 컴포넌트가 포함된 파일에서 반드시 컴포넌트만 export 해야만 하는지의 여부
      'react/jsx-curly-brace-presence': [
        // JSX에서 중괄호 사용을 제어
        'error',
        {
          props: 'never', // props에 대한 설정
          children: 'never', // children에 대한 설정
          propElementValues: 'always', // JSX 요소인 prop 값에 대한 설정
        },
      ],

      // ----- TypeScript -----
      '@typescript-eslint/consistent-type-imports': [
        // 타입 Import 시 type-only import를 강제
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports', //  import type { Foo } 형태로 고정
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error', // 타입 Export 시 type-only export를 강제할지의 여부
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 제한 여부
      '@typescript-eslint/no-empty-interface': 'off', // 빈 인터페이스 제한 여부
      '@typescript-eslint/prefer-as-const': 'warn', // 리터럴 타입을 as const 를 통해 좁은 타입으로 강제할지의 여부
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn', // 옵셔널 체이닝(?)에 이어서 non-null 단언(!) 허용 여부
      '@typescript-eslint/no-inferrable-types': 'warn', // 추론 가능한 타입을 명시하는 것을 금지할지의 여부
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈 경계 타입 명시 여부
      '@typescript-eslint/no-empty-object-type': 'warn', // 빈 객체 타입 제한 여부
      '@typescript-eslint/no-unsafe-function-type': 'warn', // Function 타입 제한 여부
      '@typescript-eslint/no-wrapper-object-types': 'warn', // Number, String, Boolean 등 래퍼 타입 제한 여부
      '@typescript-eslint/no-unused-vars': [
        // 사용하지 않는 변수 제한 여부
        'warn',
        {
          varsIgnorePattern: '^_', // _로 시작하는 변수 무시
          argsIgnorePattern: '^_', // _로 시작하는 매개변수 무시
        },
      ],
      '@typescript-eslint/naming-convention': [
        // 변수, 함수, 타입 등의 이름 규칙 제한
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['class', 'interface', 'typeAlias'],
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase'],
          filter: {
            regex: '^use[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['UPPER_CASE', 'PascalCase'],
        },
      ],

      // ----- JSX-A11Y -----
      'jsx-a11y/anchor-is-valid': 'off', // a 태그 href 속성 제한 여부

      // ----- Import -----
      'import/first': 'error', // import 문이 최상단에 있어야 하는지의 여부
      'import/no-default-export': 'off', // default export를 제한할 것인지의 여부
      'import/no-named-as-default-member': 'off', // default export된 모듈을 import할 때 반드시 named import를 사용하도록 제한할 것인지의 여부
      'import/no-unresolved': 'off', // TypeScript가 이미 모듈 해석을 검증하므로 비활성화
      'import/namespace': 'off', // TypeScript resolver와의 충돌로 인한 오류 방지
      'import/default': 'off', // TypeScript가 이미 default export를 검증하므로 비활성화
      'import/no-named-as-default': 'off', // TypeScript가 이미 named export를 검증하므로 비활성화

      // ----- FSD -----
      // FSD 레이어 import 규칙 강제 (예: features는 pages를 import 불가)
      'fsd/forbidden-imports': [
        'error',
        {
          ignoreImportPatterns: ['@/entities/*', '@/shared/*'],
        },
      ],

      // 같은 레이어 내 슬라이스 간 직접 import 방지
      'fsd/no-cross-slice-dependency': [
        'error',
        {
          ignoreImportPatterns: ['@/entities/*', '@/shared/*'],
        },
      ],

      // 슬라이스/레이어 간 상대 경로 import 금지, 별칭(@) 사용
      // 기본적으로 같은 슬라이스 내 상대 경로는 허용 (설정 가능)
      'fsd/no-relative-imports': 'error',

      // Public API (index 파일)를 통한 import만 허용
      'fsd/no-public-api-sidestep': ['error'],

      // 비즈니스 로직 레이어에서 UI import 방지
      'fsd/no-ui-in-business-logic': 'error',

      // 전역 스토어 직접 import 금지
      'fsd/no-global-store-imports': 'error',

      // FSD 레이어 기반으로 import 순서 강제
      'fsd/ordered-imports': 'warn',
    },
  },
);
