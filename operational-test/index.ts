
import {measureSimultaneousRequestCount} from '../src/index';

const serverUrl = "https://ppng.herokuapp.com"; // (HTTP/1.1)
// const serverUrl = "http://localhost:8080"; // Local Piping Server
// const serverUrl = "https://piping-47q675ro2guv.runkit.sh"; // (HTTP/1.1)
// const serverUrl = "https://ppng.ml"; // (HTTP/2)

(async () => {
  console.log('start');
  const res2 = await measureSimultaneousRequestCount(serverUrl);
  console.log('requestCount2:', res2);
  console.log('end!');
})();
