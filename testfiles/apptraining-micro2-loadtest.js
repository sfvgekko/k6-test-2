import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { target: 100, duration: '35s' },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }, 
};

export default function () {
  const result = http.get('https://test-api.k6.io/public/crocodiles/', {
    tags: {
      test: 'apptraining-micro2-loadtest'
    }
  });
  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
