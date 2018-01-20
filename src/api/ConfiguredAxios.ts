import axios from 'axios';

export const GRAPHQL_URL = '/graphql';

const configuredAxios = axios.create({
  baseURL: '/api',
});

export default configuredAxios;
