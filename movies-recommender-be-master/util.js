const axios = require('axios');
let tmdb_baseurl = 'https://api.themoviedb.org/3/';
let tmdbapi_key = 'e48cd1d035f559e58bb735d256da6d81';

const tmdbapi = (method, url, data = null, extraparams) => {
  return axios({
    method: method,
    url: `${tmdb_baseurl}${url}?api_key=${tmdbapi_key}${extraparams ? extraparams : ''}`,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getLanguages = () => {
  return tmdbapi('GET', `configuration/languages`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const getGenres = () => {
  return tmdbapi('GET', `genre/movie/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { tmdbapi, getLanguages, getGenres };
