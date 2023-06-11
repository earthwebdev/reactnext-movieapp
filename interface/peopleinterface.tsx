export interface People{
    id: number;
    name: string;
    profile_path: string;
    known_for: Array<{}>;
    //popularity: number;
  }

  export interface PeopleInterface {
    peoples: Array<People>;
    //isMovieConcat: boolean;
  }

  export interface PopularPersonCardInterface{  
    id: number,
    name: string;
    profile_path: string;
    known_for: Array<{title:string}>;
    index: number;
  }


  export interface PersonDetailsInterface
  {
    "adult": boolean,
    "also_known_as": [],
    "biography": string,
    "birthday": string,
    "deathday": string | null,
    "gender": number,
    "homepage": string | null ,
    "id": number,
    "imdb_id": string,
    "known_for_department": string,
    "name": string,
    "place_of_birth": string,
    "popularity": number,
    "profile_path": string,
  }

  export interface PersonSocialDataInterface{
    "imdb_id": string,
    "wikidata_id": string,
    "facebook_id": string,
    "instagram_id": string,
    "twitter_id": string,
  }

  /* export interface MovieCarouselInterface{  
    title: string;
    poster: string;
    overview: string; 
    index: number;   
  } */