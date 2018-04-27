const escapeRegex = require('./escape-regex.js');

function loader(source, map, meta) {
    const workerRegex = /new Worker\(["'`](.+?)["'`]\)/g;
    let matches;

    const callback = this.async();
    let hasMatches = false;

    while ((matches = workerRegex.exec(source)) !== null) {
        hasMatches = true;
        const path = matches[1];

        this.loadModule(path, (err, contents) => {
            source = source.replace(new RegExp(`["'\`]${escapeRegex(path)}["'\`]`), () => {
                return `(() => {
                    var blob = new Blob([\`${contents.replace(/`/g, '\\`')}\`]);
                    
                    return URL.createObjectURL(blob); 
                })()`
            });

            callback(err, source, map, meta);
        });
    }

    if (!hasMatches) {
        callback(null, source, map, meta);
    }
}

module.exports = loader;
