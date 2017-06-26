## .editorconfig

EditorConfig is a file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.

Supported by:
- IntellijIDEA
- WebStorm
- SourceLair
- RubyMine

Plugins for:
- Visual Studio Code
-- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Atom
- ...
- list of plugins: http://editorconfig.org/#download

### Basic content
```
# top-most EditorConfig file
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

## Package Manager

Popular alternatives: bower, npm, JSPM

- install Node.js (which includes npm)
  Node.js is a set of libraries for JavaScript which allows it to be used outside of the browser. It is primarily focused on creating simple, easy to build network clients and servers.

- add package.json (manifest file for npm); e.g. run ```npm init```
### Basic content
```
{
  "name": "[PROJECT_NAME]",
  "version": "1.0.0",
  "description": "a simple javascript template project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MoePad/javascript-template-project.git"
  },
  "author": "MoePad",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/MoePad/javascript-template-project/issues"
  },
  "homepage": "https://github.com/MoePad/javascript-template-project#readme"
}

```
-
