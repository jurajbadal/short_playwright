import http from 'k6/http';
//import { sleep } from 'k6';
//import { Counter, Trend, Rate, Gauge } from 'k6/metrics';
//import { check } from 'k6';


//import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  // A number specifying the number of VUs to run concurrently.
 // vus: 10,
  // A string specifying the total duration of the test run.
  duration: '1m',
  //stages: [{ duration: '1m', target: 5 }],
  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // cloud: {
  //   // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //   // By default tests are executed in default project.
  //   projectID: "",
  //   // The name of the test in the k6 Cloud UI.
  //   // Test runs with the same name will be grouped.
  //   name: "script.js"
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//https://test.k6.io
//http://37.27.17.198:8084/cs
//export default function () {
  // Set cookie for all requests in this virtual user
// const jar = http.cookieJar();
//  jar.set('https://www.tractive.com', 'interview', '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl', {
//    domain: '.tractive.com',
//    path: '/',
//    secure: true,
//    httpOnly: false,
//    maxAge: 30 * 24 * 60 * 60, // 30 days
//    sameSite: 'None'
//  })
//}

//export default function() {
//  http.get('https://example.com');
//  sleep(1);
  
//}; 
// Call handleJiraOutput
export default function () {
  http.get('https://example.com');
  
}
export function handleSummary(data) {
  const med_latency = data.metrics.iteration_duration.values.med;
  const latency_message = `The median latency was ${med_latency}\n`;

  return {
    stdout: latency_message,
  };
}
/*export default function () {
  const res = http.get('${BASE_URL}/public/crocodiles/');
  check(res, {'status was 200': (r) => r.status ==200});
}*/
// Custom metrics
//let successfulRequests = new Counter('successful_requests');
//let failedRequests = new Counter('failed_requests');
//let requestDuration = new Trend('request_duration');
//let requestSize = new Trend('request_size');
//let successRate = new Rate('success_rate');
//let activeUsers = new Gauge('active_users');
//export default function () {
 //let res = http.get('https://example.com');
 // Track active users
 //activeUsers.add(__VU);
 // Track request size and duration
 //requestDuration.add(res.timings.duration);
 //requestSize.add(res.request.bytes);
 // Check the response and track successes/failures
 //let success = check(res, {
 //'status is 200': (r) => r.status === 200,
 //});
 //if (success) {
//successfulRequests.add(1);
 //successRate.add(true);
 //} else {
// failedRequests.add(1);
// successRate.add(false);
// }
//} 
// At end of test
