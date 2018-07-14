import * as hat from 'hat';
import * as  MockAdapter from 'axios-mock-adapter';
import { Http, HttpInterceptor } from '../../lib';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

describe('lib.base.Http', () => {
  let http;

  beforeEach(async () => {
    // This sets the mock adapter on the default instance
    http = new Http({ baseURL: 'http://localhost:3000/test_url' });
    const mock = new MockAdapter(http.client);

    // Mock all requests to a simple success
    mock.onGet('/get').reply(200, {});
    mock.onPut('/put').reply(200, {});
    mock.onPost('/post').reply(200, {});
    mock.onDelete('/delete').reply(200, {});
  });

  afterEach(async () => {
    http = undefined;
  });

  it('should instantiate call a mocked instance', async () => {
    expect(http).toBeTruthy();
    expect(http.client).toBeTruthy();

    expect(http.get instanceof Function).toBeTruthy();
    expect(await http.get('/get', {})).toBeTruthy();

    expect(http.post instanceof Function).toBeTruthy();
    expect(await http.post('/post', {})).toBeTruthy();

    expect(http.put instanceof Function).toBeTruthy();
    expect(await http.put('/put', {})).toBeTruthy();

    expect(http.delete instanceof Function).toBeTruthy();
    expect(await http.delete('/delete', {})).toBeTruthy();
  });

  it('should intercept a simple request', async () => {
    let intercepted = false;

    class TestInterceptor implements HttpInterceptor {
      async request(request: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        intercepted = true;
        return request;
      }
      async response(response: AxiosResponse<any>): Promise<AxiosResponse<any>> {
        intercepted = true;
        return response;
      }
      async error(error: AxiosError): Promise<AxiosError> {
        intercepted = true;
        return error;
      }
    }

    http.interceptors([new TestInterceptor()]);
    expect(await http.get('/get', {})).toBeTruthy();
    expect(intercepted).toBeTruthy();
  });
});
