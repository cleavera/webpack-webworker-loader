# Webpack web worker loader

A simple webworker loader for webpack.

## Installation

```
npm install webpack-webworker-loader --save-dev
```

## Setup

Add as a loader to your webpack configuration

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'webpack-webworker-loader'
                ]
            }
        ]
    }
};
```

## Usage

Just use the standard syntax with your path pointing to the file in source code, the loader will handle the rest.

Worker: ('/app/worker/index.js')
```
console.log('Hello world');
```

Load: Worker: ('/app/app/index.js')
```
const worker = new Worker('../worker/index.js');
```
