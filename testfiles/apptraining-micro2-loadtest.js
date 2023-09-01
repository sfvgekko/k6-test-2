import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { target: 100, duration: '60s' },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }, 
};

export default function () {
  const employeeNumber = Math.floor(Math.random() * 5) + 1;

  const result = http.get(`http://localhost:8085/api/employee-report/employee/${employeeNumber}/month/6/year/2023`, {
    tags: {
      test: 'apptraining-micro2-loadtest'
    }
  });

  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
