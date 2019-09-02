import { renderHook, act } from '@testing-library/react-hooks';

import useHTTP from '../src/useHTTP';
import http, { CancelToken } from '../src/ajaxHelper';

jest.mock('../src/ajaxHelper.js');

describe('useHTTP', () => {
  it('should initialize the request', async () => {
    let resolver;
    const promise = new Promise((resolve) => {
      resolver = resolve;
    });

    http.mockImplementation(() => promise);
    jest.spyOn(CancelToken, 'source').mockImplementation(jest.fn);
    const responseData = [];

    const { result, waitForNextUpdate } = renderHook(() => useHTTP('/test/url'));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.fetch).toBeInstanceOf(Function);

    act(() => {
      result.current.fetch();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeTruthy();

    resolver({ data: responseData });
    await waitForNextUpdate();

    expect(result.current.data).toBe(responseData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });
});
