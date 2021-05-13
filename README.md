# React, Typescript, Netlify, Vite, TailwindCSS Starter
## What is it:
This is a basic working dev environment for working on a React/Typescript application, including TailwindCSS, and using _next generation tooling_ from Vite. In addition running lambda's from Netlify/Typescript in the same environment.

## Installation:
⚠️ This assumes you have the [netlify-cli](https://docs.netlify.com/cli/get-started/) installed.
```
git clone 
```

## Logging:
I like seeing typescript errors in my console, as well as using VS Code, or any other modern text editor, so we run tsc concurrently with vite and it's HMR. The output then looks something like this:
```
[⚡️vite]   ready in 238ms.
[👹tsc] 4:42:46 PM - Found 0 errors. Watching for file changes.
```

### Change this:
You can change this inside package.json, the "dev" script.
```json
"concurrently -n \"⚡️vite,👹tsc\" -c \"cyan,red\" \"vite\" \"tsc -w\""
```
-n specifies to names for each command output
-c specifies the color for each command output
If you don't want to see any tsc errors in the command line, just remove "-w". This means that you will see typescript errors on the inital vite build, but not after that.

## Build:
Currently it is set to error before build if typescript errors don't pass. This means that Netlify won't deploy either, if there are typescript errors. Based on the tsconfig.json, we are also checking the functions folder when we run tsc.

### Change this:
You can change this inside package.json, the "build" script.
```json
"tsc && vite build"
```
Just remove tsc, but remember that it can be nice to be notified of potential errors before you build.
