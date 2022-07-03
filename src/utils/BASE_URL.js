// eslint-disable-next-line quotes
const BASE_URL = 'http://localhost:3200/api';

const { REACT_APP_API_URL } = process.env;

export default REACT_APP_API_URL || BASE_URL;
