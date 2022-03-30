const profiler = require('cpupro');

function hrToSeconds(hrtime) {
    const raw = hrtime[0] + hrtime[1] / 1e9;

    return raw.toFixed(2) + 's';
}

profiler.profile('profileName');
const t = process.hrtime()


console.log('exports', { className: require('@fluentui/react-northstar').avatarClassName })

const profile = profiler.profileEnd('profileName');
profile.report.writeToFile('./report-require.html');

console.log('Done in', hrToSeconds(process.hrtime(t)))