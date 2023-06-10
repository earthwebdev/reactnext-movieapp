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

  export interface MovieDetailsInterface{
    
      adult: boolean,
      backdrop_path: string,
      belongs_to_collection: null,
      budget: number,
      genres: Array<{}>,
      homepage: string,
      id: number,
      imdb_id: string,
      original_language: string,
      original_title: string,
      overview: string,
      popularity: number,
      poster_path: string,
      production_companies: Array<MovieProductionCompany>,
      production_countries: Array<MoviesCountry>,
      release_date: string,
      revenue: number,
      runtime: number,
      spoken_languages: Array<MovieSpokenLanguages>,
      status: string,
      tagline: "",
      title: string,
      video: boolean,
      vote_average: number,
      vote_count: number,
  }

  export interface MovieSpokenLanguages{
    english_name: string,
    iso_639_1: string,
    name: string,
  }
   export interface MovieProductionCompany {
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }


  export interface MoviesCountry{
      iso_3166_1: string,
      name: string,
  }

  export interface MovieSocialDataInterface{
    "imdb_id": string,
    "wikidata_id": string,
    "facebook_id": string,
    "instagram_id": string,
    "twitter_id": string,
  }

  export interface MovieCreditCrewDetailsInterface{
    
    crew: Array<MovieCreditCrew>,
  }

  

  export interface MovieCreditCrew{  
        adult: boolean
        gender: number,
        id: number,
        known_for_department: string,
        name: string,
        original_name: string,
        popularity: number,
        profile_path: string,
        credit_id: string,
        department: string,
        job: string
  }

  export interface MovieCreditCastDetailsInterface{
    cast: Array<MovieCreditCast>,
  }

  export interface MovieCreditCast{
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
  }



  export interface MovieCarouselInterface{  
    title: string;
    poster: string;
    overview: string; 
    index: number;   
  }

  export interface MovieCardInterface{  
    id: number;
    title: string;
    poster: string;
    releaseYear: string;
    rating: number;
    index: number;
  }