import axios from 'axios';

const http = axios.create();

export default http;

export { CancelToken, isCancel } from 'axios';
