import axios from 'axios';
import mockApi from './mocks';

// Toggle between real and mock APIs
const USE_MOCK_API = true;

const apiClient = axios.create({
  baseURL: 'https://api.yourcompany.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  getEmployeeMessages: (employeeId: string) =>
    USE_MOCK_API
      ? mockApi.getEmployeeMessages(employeeId)
      : apiClient.get(`/employees/${employeeId}/messages`).then(res => res.data),

  updateProductFrequency: (frequency: string) =>
    USE_MOCK_API
      ? mockApi.updateProductFrequency(frequency)
      : apiClient.put('/products/frequency', { frequency }).then(res => res.data),

  getProductInfo: (startDate?: string, endDate?: string) =>
    USE_MOCK_API
      ? mockApi.getProductInfo(startDate, endDate)
      : apiClient
          .post('/products/info', { startDate, endDate })
          .then(res => res.data),

  getStoreEmployees: (storeId: string) =>
    USE_MOCK_API
      ? mockApi.getStoreEmployees(storeId)
      : apiClient.get(`/stores/${storeId}/employees`).then(res => res.data),

  getEmployeeSchedule: (employeeId: string) =>
    USE_MOCK_API
      ? mockApi.getEmployeeSchedule(employeeId)
      : apiClient
          .get(`/employees/${employeeId}/schedule`)
          .then(res => res.data),
};

export default api;

