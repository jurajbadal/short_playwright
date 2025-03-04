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
    'response_time': ['p(95)<500'],
    'error_rate': ['rate<0.1'],
    'content_check_rate': ['rate>0.9'],
  }
};

export default function() {
  // HTTPBin API endpoints
  const responses = {
    get: http.get('https://httpbin.org/get'),
    status: http.get('https://httpbin.org/status/200'),
    headers: http.get('https://httpbin.org/headers')
  };
  
  Object.entries(responses).forEach(([name, response]) => {
    // Track response time
    responseTimeTrend.add(response.timings.duration, { endpoint: name });
    
    // Check for errors
    const isSuccessful = response.status === 200;
    errorRate.add(!isSuccessful, { endpoint: name });
    
    // Content checks
    let contentCheck = false;
    if (name === 'get') {
      contentCheck = response.json().url !== undefined;
    } else if (name === 'status') {
      contentCheck = response.status === 200;
    } else if (name === 'headers') {
      contentCheck = response.json().headers !== undefined;
    }
    
    contentCheckRate.add(contentCheck, { endpoint: name });
  });
  
  sleep(1);
}

export function handleSummary(data) {
  return {
    'html-report.html': htmlReport(data),
  };
}
