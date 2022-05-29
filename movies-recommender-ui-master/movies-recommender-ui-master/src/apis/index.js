import axios from 'axios';
import constants from '../constants';

let getConfig = 'http://54.235.54.162:8000/';

let tmdb_baseurl = 'https://api.themoviedb.org/3/';
let tmdbapi_key = 'e48cd1d035f559e58bb735d256da6d81';

const api = (method, url, data = null, token = null) => {
  if (token) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      credentials: true,
    };
  }
  return axios({
    method: method,
    url: `${getConfig}${url}`,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

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

export const login = (data) => {
  return api('post', constants.API.LOGIN, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const register = (data) => {
  return api('post', constants.API.REGISTER, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const savePreferences = (userId, data) => {
  return api('post', `${constants.API.SAVEPREFERENCES}${userId}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPreferences = (userId) => {
  return api('get', `${constants.API.GETPREFERENCES}${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserTypes = () => {
  return api('GET', constants.API.GETUSERTYPES)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPopular = (tvOrMovie, lang) => {
  return tmdbapi('GET', `${tvOrMovie}/popular`, null, `&language=${lang || 'en-US'}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTrending = (time_window, lang) => {
  return tmdbapi('GET', `trending/movie/${time_window}`, null, `&language=${lang || 'en-US'}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPopularPeople = (page) => {
  return tmdbapi('GET', `person/popular`, null, `&page=${page ? page : 1}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPersonDetails = (person_id) => {
  return tmdbapi('GET', `person/${person_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPersonCredits = (person_id, creditsOn) => {
  return tmdbapi('GET', `person/${person_id}/${creditsOn}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getMovieDetails = (movieId) => {
  return tmdbapi('GET', `movie/${movieId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTvDetails = (tvId) => {
  return tmdbapi('GET', `tv/${tvId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTvCredits = (tvId) => {
  return tmdbapi('GET', `tv/${tvId}/credits`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getMovieCredits = (movieId) => {
  return tmdbapi('GET', `/movie/${movieId}/credits`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getMovieProviders = (movieId) => {
  return tmdbapi('GET', `/movie/${movieId}/watch/providers`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTvProviders = (movieId) => {
  return tmdbapi('GET', `/tv/${movieId}/watch/providers`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getSimilarMovies = (movieId) => {
  return tmdbapi('GET', `/movie/${movieId}/similar`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getSimilarTV = (tvId) => {
  return tmdbapi('GET', `tv/${tvId}/similar`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchMovies = (page, query) => {
  return tmdbapi('GET', `search/movie`, null, `&page=${page ? page : 1}&query=${query}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchTV = (page, query) => {
  return tmdbapi('GET', `search/tv`, null, `&page=${page ? page : 1}&query=${query}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchPeople = (page, query) => {
  return tmdbapi('GET', `search/person`, null, `&page=${page ? page : 1}&query=${query}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getLanguages = () => {
  return tmdbapi('GET', `configuration/languages`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getGenres = () => {
  return tmdbapi('GET', `genre/movie/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const discoverBasedOnPreferences = (genre) => {
  return tmdbapi('GET', `discover/movie`, null, `&with_genres=${genre}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
