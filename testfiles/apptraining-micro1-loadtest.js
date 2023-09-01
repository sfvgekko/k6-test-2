import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { target: 10, duration: '20s' },
    { target: 20, duration: '20s' },
    { target: 30, duration: '20s' },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }, 
};


export default function () {
  const result = http.get('https://test-api.k6.io/public/crocodiles/', {
    tags: {
      test: 'apptraining-micro1-loadtest'
    }
  });  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
