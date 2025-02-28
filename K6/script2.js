import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Custom metrics
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
  // JSONPlaceholder API endpoints
  const responses = {
    posts: http.get('https://jsonplaceholder.typicode.com/posts/1'),
    comments: http.get('https://jsonplaceholder.typicode.com/posts/1/comments'),
    users: http.get('https://jsonplaceholder.typicode.com/users/1')
  };
  
  // Track response times for each endpoint
  Object.entries(responses).forEach(([name, response]) => {
    responseTimeTrend.add(response.timings.duration, { endpoint: name });
    
    // Check for errors
    const isSuccessful = response.status === 200;
    errorRate.add(!isSuccessful, { endpoint: name });
    
    // Content checks specific to each endpoint
    let contentCheck = false;
    if (name === 'posts') {
      contentCheck = response.json().title !== undefined;
    } else if (name === 'comments') {
      contentCheck = response.json().length > 0;
    } else if (name === 'users') {
      contentCheck = response.json().name !== undefined;
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
