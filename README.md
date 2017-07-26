# Specific Topics Branch

## master Branch
For a general set up please refer to the master branch!

## Typescript and Webpack and Babel

Use the basic set up from master branch.

Popular alternatives for webpack TS loaders:
- tsloader
- awesome-typescript-loader

- ```npm install typescript --save-dev```
- add `tsconfig.json` to project root
  - ```
    {
        "compileOnSave": false,
        "compilerOptions": {
            "allowSyntheticDefaultImports": true,
            "lib": [
                "dom",
                "es2015",
                "es2016"
            ],
            "jsx": "preserve",
            "target": "es2016",
            "module": "es2015",
            "moduleResolution": "node",
            "noImplicitAny": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "removeComments": false,
            "preserveConstEnums": true,
            "sourceMap": true,
            "skipLibCheck": true
        }
    }
    ```
- adapt npm scripts
  - add `"tslint": "tslint 'src/**/*ts' -c tslint.json"`
  - adapt start: `"start": "npm-run-all --parallel security-check start-dev-server eslint:watch tslint test:watch start-mock-api"`
  - adapt test: `"test": "mocha --reporter progress buildScripts/testSetup.js 'src/**/*.test.ts' --color"`
- rename all source `*.js` files to `*.ts`
  - e.g. `index.js` to `index.ts`
- adapt `webpack.config.*.js`
  - change entry point
    - ```
      entry: [
        path.resolve(__dirname, '../src/index.ts'),
        vendor: path.resolve(__dirname, '../src/vendor.ts') //for prod
      ],
      ```
  - add .ts and .tsx to be resolved
    - ```
      resolve: {
          extensions: [".ts", ".tsx", ".js", ".json", ".css"]
      }
      ```
- use `document` instead of `global.document` in `index.ts`
- fix errors in your source ;)

### enable decorators
 - add to `tsconfig.json`
   - ```
     {
        ...
        "compilerOptions": {
          "experimentalDecorators": true
        }
     }
     ```
- `npm install babel-plugin-transform-class-properties`
- add to `.babelrc`
  - ```
    {
      "plugins": [
        ["transform-class-properties", { "spec": true }]
      ]
    }
    ```

### with tsloader
- ```npm install ts-loader --save-dev```
- add loader to `webpack.config.*.js`
  - ```
    module: {
      rules: [
        ...
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        }
      ]
    }
    ```

### set up testing
- `npm install @types/mocha @types/chai --save-dev`
  - type definitions for mocha and chai
- `npm install mocha-typescript --save-dev`
- adapt `package.json` to invoke typescript compiler before running mocha tests
  - add `--require ts-node/register`
  - e.g.
    - ```
      {
        "scripts": {
          "test": "mocha --reporter progress --require ts-node/register buildScripts/testSetup.js 'src/**/*.test.ts' --color",
        }
      }
      ```

### change from eslint to tslint
- `npm install tslint --save-dev`
- add `tsllint.json`
  - ```
    {
        "extends": "tslint:recommended",
        "rules": {
            "max-line-length": {
                "options": [140]
            },
            "quotemark": [true, "single"],
            "semicolon": [true, "never"],
            "curly": [true, "ignore-same-line"],
            "whitespace": [true, "check-decl", "check-operator", "check-typecast"],
            "comment-format": false,
            "ordered-imports": false,
            "arrow-parens": false,
            "no-debugger": {
              "severity": "warning"
            },
            "new-parens": true,
            "no-arg": true,
            "no-bitwise": true,
            "no-conditional-assignment": true,
            "no-consecutive-blank-lines": false,
            "no-console": {
                "options": [
                    "debug",
                    "info",
                    "log",
                    "time",
                    "timeEnd",
                    "trace"
                ],
                "severity": "warning"
            }
        }
    }
    ```
- adapt `package.json` scripts
  - add `"tslint": "tslint 'src/**/*ts' -c tslint.json"`
  - adapt start script
    - `"start": "npm-run-all --parallel security-check start-dev-server eslint:watch tslint test:watch start-mock-api"`
