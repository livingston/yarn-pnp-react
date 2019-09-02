const http = jest.fn(() => new Promise());

export default http;

export const CancelToken = {
  source: jest.fn(() => ({
    token: 'CANCEL_TOKEN',
    cancel: jest.fn()
  }))
};

export const isCancel = jest.fn();
