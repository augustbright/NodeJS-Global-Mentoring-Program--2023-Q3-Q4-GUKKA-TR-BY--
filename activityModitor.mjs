import childProcess from 'child_process';
import os from 'os';
import fs from 'fs';

const REFRESH_INTERVAL = 100;
const LOG_INTERVAL = 1000 * 60;
const LOG_FILENAME = 'activityMonitor.log';

const COMMAND = {
    'win32': `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
    'linux': `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`,
    'darwin': `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
};
const command = COMMAND[os.platform()] ?? "echo this platform is not supported";

let log = '';

const interval = setInterval(() => {
    childProcess.exec(command, (err, stdout, stderr) => {
        console.clear();
        if (err) {
            console.error(err);
            clearInterval(interval);
            return;
        }
        
        if (stderr) {
            console.error(stderr);
        } else {
            console.log(stdout);
            log += `${Date.now()} : ${stdout}`;
        }        
    });
}, REFRESH_INTERVAL);

setInterval(() => {
    fs.appendFile(LOG_FILENAME, log, () => {});
    log = '';
}, LOG_INTERVAL);