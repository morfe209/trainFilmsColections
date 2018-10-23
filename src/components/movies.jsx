import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGanreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: Allmovies,
      selectedGenre
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? Allmovies.filter(m => m.genre._id === selectedGenre._id)
        : Allmovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { filteredCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, genres } = this.state;
    if (count === 0) return <h1>no films</h1>;

    const { filteredCount, data: movies } = this.getData();

    return (
      <div className="row">
        <div className="col-3 mt-2">
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGanreSelect}
          />
        </div>
        <div className="col">
          <h1>List Film {filteredCount}</h1>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
