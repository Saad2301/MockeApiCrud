import Axios from './axiosInterceptor';
const BASE_URL = 'https://64b77dd721b9aa6eb0782d3f.mockapi.io';
// Function for making API calls
export default function apiCaller(
  {
  method = 'get',
  url = '',
  params = '',
  data = {},
}
)
{
  return Axios({
    method, // Convert method to string and lowercase
    url: `${BASE_URL}/${url}`,
    data,
    responseType: 'json',
  });
}
