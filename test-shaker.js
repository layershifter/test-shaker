const { Module } = require('@linaria/babel-preset')
const shaker = require('@linaria/shaker').default
const fs = require('fs')
const profiler = require('cpupro');

function hrToSeconds(hrtime) {
    const raw = hrtime[0] + hrtime[1] / 1e9;

    return raw.toFixed(2) + 's';
}

profiler.profile('profileName');
const t = process.hrtime()

const code = fs.readFileSync('./code.js', { encoding: 'utf-8'})
const mod = new Module('code.js', {
    rules: [
        {
            action: shaker,
        },
        {
            test: /[/\\]node_modules[/\\]/,
            action: 'ignore',
        },
    ],
})

mod.evaluate(code, ['className'])

console.log('exports', mod.exports)

const profile = profiler.profileEnd('profileName');
profile.report.writeToFile('./report-shaker.html');

console.log('Done in', hrToSeconds(process.hrtime(t)))