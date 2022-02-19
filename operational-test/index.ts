
import {measureSimultaneousRequestCount} from '../src';

const serverUrl = "https://ppng.herokuapp.com"; // (HTTP/1.1)
// const serverUrl = "http://localhost:8080"; // Local Piping Server
// const serverUrl = "https://piping-47q675ro2guv.runkit.sh"; // (HTTP/1.1)
// const serverUrl = "https://ppng.ml"; // (HTTP/2)

const originalConsoleLog = console.log;
const consoleTextArea = document.getElementById('console_textarea') as HTMLTextAreaElement

console.log = (...args) => {
  consoleTextArea.value += `${args.join(" ")}\n`;
  originalConsoleLog.apply(args);
};

(async () => {
  console.log('start');
  const res2 = await measureSimultaneousRequestCount(serverUrl);
  console.log('requestCount2:', res2);
  console.log('end!');
})();
