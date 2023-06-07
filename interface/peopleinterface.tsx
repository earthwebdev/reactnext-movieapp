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
    name: string;
    profile_path: string;
    known_for: Array<{title:string}>;
    index: number;
  }

  /* export interface MovieCarouselInterface{  
    title: string;
    poster: string;
    overview: string; 
    index: number;   
  } */