// import * as genresAPI from "./fakeGenreService";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

// export function saveMovie(movie) {
//   debugger;
//   if (movie._id) {
//     debugger;
//     const body = { ...movie };
//     delete body._id;
//     debugger;
//     const result = http.put(movieUrl(movie.id), body);
//     debugger;
//     return result;
//   }
//   return http.post(apiEndPoint, movie);
// }

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndPoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
