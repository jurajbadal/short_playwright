import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const responseTimeTrend = new Trend('response_time');
const errorRate = new Rate('error_rate');
const contentCheckRate = new Rate('content_check_rate');

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    'response_time': ['p(95)<1000'], // Increased threshold as external APIs might be slower
    'error_rate': ['rate<0.1'],
    'content_check_rate': ['rate>0.9'],
  }
};

export default function() {
  // Multiple API endpoints to test
  const responses = {
    randomUser: http.get('https://randomuser.me/api/'),
    jsonPlaceholder: http.get('https://jsonplaceholder.typicode.com/posts/1'),
    httpBin: http.get('https://httpbin.org/get')
  };
  
  Object.entries(responses).forEach(([name, response]) => {
    // Track response time
    responseTimeTrend.add(response.timings.duration, { endpoint: name });
    
    // Check for errors
    const isSuccessful = response.status === 200;
    errorRate.add(!isSuccessful, { endpoint: name });
    
    // Content checks
    let contentCheck = false;
    if (name === 'randomUser') {
      contentCheck = response.json().results.length > 0;
    } else if (name === 'jsonPlaceholder') {
      contentCheck = response.json().id === 1;
    } else if (name === 'httpBin') {
      contentCheck = response.json().url.includes('httpbin.org');
    }
    
    contentCheckRate.add(contentCheck, { endpoint: name });
    check(response, {
      [`${name} contains expected content`]: () => contentCheck
    });
  });
  
  sleep(1);
}

export function handleSummary(data) {
  return {
    'html-report.html': htmlReport(data),
  };
}
