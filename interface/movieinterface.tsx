export interface Movie{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }

  export interface MovieInterface {
    movies: Array<Movie>;
    //isMovieConcat: boolean;
  }

  export interface MovieCarouselInterface{  
    title: string;
    poster: string;
    overview: string; 
    index: number;   
  }

  export interface MovieCardInterface{  
    title: string;
    poster: string;
    releaseYear: string;
    rating: number;
    index: number;
  }