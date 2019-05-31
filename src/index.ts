export async function roundtripTime(serverUrl: string) {
  const path = "roundtrip-test"+Math.random();
  const startTime = new Date();
  fetch(`${serverUrl}/${path}`, {
    method: "POST",
    body: "OK"
  });
  const res = await fetch(`${serverUrl}/${path}`);
  await res.text();
  const time = new Date().getTime() - startTime.getTime();
  return time;
}

export async function canSimultaneousRequestN(serverUrl: string, roundtripMillis: number, n: number) {
  // require n >= 2

  // NOTE: Math.max means "at least"
  const timeout = roundtripMillis * (Math.max(n / 2, 5));

  return new Promise(async (resolve) => {
    const postPathAndAborts: {path: string, controller: AbortController}[] = [];

    const abortAll = () => {
      for (const {controller} of postPathAndAborts) {
        controller.abort();
      }
    };

    setTimeout(() => {
      abortAll();
      resolve(false);
    }, timeout);

    for(let i = 0; i < n-1; i++) {
      const controller = new AbortController();
      const path = Math.random()+"";
      postPathAndAborts.push({path, controller});
      fetch(`${serverUrl}/${path}`, {
        method: "POST",
        signal: controller.signal,
        body: 'i: ' + i
      });
    }
    const lastPath = postPathAndAborts[postPathAndAborts.length - 1].path;
    const res = await fetch(`${serverUrl}/${lastPath}`);
    await res.text();

    abortAll();
    resolve(true);
  });
}

export type ReqCount = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Over10';

export function measureSimultaneousRequestCount(serverUrl: string): Promise<ReqCount> {
  return new Promise(async (resolve) => {
    const roundtripMillis = await roundtripTime(serverUrl);
    console.log('roundtripTime:', roundtripMillis);
    const timeout = roundtripMillis * 2.5;
    let prevCount: ReqCount = 2;
    const abortController = new AbortController();
    for (const count of [3, 4, 5, 6, 7, 8, 9, 10, 'Over10'] as const) {
      const path1 = Math.random() + '';
      const path2 = Math.random() + '';
      fetch(`${serverUrl}/${path1}/${count}`, {
        method: "POST",
        signal: abortController.signal,
        body: 'this is a body',
      });
      fetch(`${serverUrl}/${path2}/${count}`, {
        method: "POST",
        signal: abortController.signal,
        body: 'this is a body',
      });
      const startTime = new Date().getTime();
      const resPromise = fetch(`${serverUrl}/${path2}/${count}`, {
        method: "GET",
        signal: abortController.signal,
      });
      const timer = setTimeout(() => {
        console.log('abort !');
        // Abort
        abortController.abort();
        // Resolve as previous count
        resolve(prevCount);
      }, timeout);
      // Wait for response
      const res = await resPromise;
      await res.text();
      const endTime = new Date().getTime();
      // Clear the timeout
      clearTimeout(timer);
      // Update previous count
      prevCount = count;
      console.log(`diffTime: ${endTime - startTime}`);
    }
    resolve('Over10');
  });
}
