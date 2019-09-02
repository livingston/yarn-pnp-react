/* eslint-disable consistent-return */
import {
  useState, useEffect,
  useCallback, useReducer
} from 'react';
import http, { CancelToken, isCancel } from './ajaxHelper';

// const noop = () => {};
const defaultTransform = d => d;
const defaultOptions = {};

const initialResponse = {
  data: null,
  error: null,
  isLoading: false
};

export const responseActions = {
  init: 'init',
  success: 'success',
  fail: 'fail'
};

function responseReducer(state, action) {
  switch (action.type) {
    case responseActions.init:
      return {
        data: null,
        error: null,
        isLoading: true
      };
    case responseActions.success:
      return {
        data: action.payload,
        error: null,
        isLoading: false
      };
    case responseActions.fail:
      return {
        data: null,
        error: action.payload,
        isLoading: false
      };
    default:
      return initialResponse;
  }
}


function useHTTP(url, options = defaultOptions) {
  const [response, dispatch] = useReducer(responseReducer, initialResponse);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [requestData, setRequestData] = useState({});

  const fetch = useCallback((reqData) => {
    setShouldFetch(Date.now());
    setRequestData(reqData);
  }, [setShouldFetch, setRequestData]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const { method = 'get', transformData = defaultTransform, ...requestOptions } = options;
    const source = CancelToken.source();

    dispatch({ type: responseActions.init });

    http({
      url,
      method,
      cancelToken: source.token,
      ...requestData,
      ...requestOptions
    })
      .then(({ data }) => {
        const payload = transformData(data);
        dispatch({ type: responseActions.success, payload });
      })
      .catch((err) => {
        if (!isCancel(err)) {
          dispatch({ type: responseActions.fail, payload: err });
        }
      });

    function cleanup() {
      source.cancel();
    }

    return cleanup;
  }, [shouldFetch, url, options, requestData]);

  return {
    ...response,
    fetch
  };
}

export default useHTTP;
