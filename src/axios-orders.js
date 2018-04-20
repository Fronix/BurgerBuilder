import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-7ee71.firebaseio.com/'
});

export default instance;
