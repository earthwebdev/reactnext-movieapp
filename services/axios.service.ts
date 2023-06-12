import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchTrendingMovies = async () => {
    try {
        const resp = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US&sort_by=release_date&sort_order=desc&api_key='+API_KEY);
        //console.log('trending',resp.data);
        //setTrendingMovies(resp.data.results);
        return resp.data;
     } catch (error) {
        console.log(error)
        return {error: error};
     }

}

  export const fetchPopularPeoples =async (page = 1) => {
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key='+API_KEY+'&page='+page); 
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
  }

  export const fetchGenreMoviesList =async () => {
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key='+API_KEY); 
      //console.log(resp.data);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
  }

  export const fetchMoviesDataBySearch = async( props: any) => {  
   const { genreId, searchKeyword, sortFiltervalue, page}  = props;
   let url = 'https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY+'&include_adult=false';
    url += genreId && genreId > 0 ? '&with_genres=' + genreId : '';
    url += searchKeyword && searchKeyword != '' ? '&with_keywords=' + searchKeyword : '';
    url += sortFiltervalue && sortFiltervalue != '' ? '&sort_by=' + sortFiltervalue : '';
    url += page ? '&page=' + (page+1) : 1;
    //console.log(url, 'url');
   try {
      const resp = await axios.get(url);
      //console.log(resp);      
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
}

export const fetchMoviesByParamsData = async(props: any) => {     
   let fetchType = props.fetchType;
   fetchType = fetchType ? fetchType : 'popular';
   let loaddatapage = props.loaddatapage; 
   loaddatapage = loaddatapage ?  loaddatapage: 1;
   try { 
      const resp = await axios.get('https://api.themoviedb.org/3/movie/'+fetchType+'?api_key='+API_KEY+'&language=en-US&page='+loaddatapage);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
}

export const fetchMoviesDetailsByParamsData = async(props: any) => {   
   //console.log(props);  
   let id = props.id;
   if(id <= 0){
      return;
   }
   let fetchType = props.fetchType;
   fetchType = fetchType ?fetchType : '';

   let loaddatapage = props.loaddatapage; 
   loaddatapage = loaddatapage ?  loaddatapage: 1;
   try {
      //console.log(`https://api.themoviedb.org/3/movie/${id}${fetchType}?api_key=${API_KEY}&language=en-US&page=${loaddatapage}`);
      //const resp = await axios.get('https://api.themoviedb.org/3/movie/'+id+ { fetchType != '' ? '/'+ fetchType:''} +'?api_key='+API_KEY+'&language=en-US&page='+loaddatapage);
      const resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}${fetchType}?api_key=${API_KEY}&language=en-US&page=${loaddatapage}`);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
}

export const fetchPersonsDetailsByParamsData = async(props: any) => {   
   //console.log(props);  
   let id = props.id;
   if(id <= 0){
      return;
   }
   let fetchType = props.fetchType;
   fetchType = fetchType ?fetchType : '';

   let loaddatapage = props.loaddatapage; 
   loaddatapage = loaddatapage ?  loaddatapage: 1;
   try {
      //console.log(`https://api.themoviedb.org/3/movie/${id}${fetchType}?api_key=${APIKEY}&language=en-US&page=${loaddatapage}`);
      //const resp = await axios.get('https://api.themoviedb.org/3/movie/'+id+ { fetchType != '' ? '/'+ fetchType:''} +'?api_key='+APIKEY+'&language=en-US&page='+loaddatapage);
      const resp = await axios.get(`https://api.themoviedb.org/3/person/${id}${fetchType}?api_key=${API_KEY}&language=en-US&page=${loaddatapage}`);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
      return {error: error};
   }
}


/* export const getMovieDetailsById = async (id: any) => {
   if((!id)){
      console.log('Id is required.');
   }
   
   try { 
      const resp = await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY+'&language=en-US');
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }

}

export const getMovieCreditDetailsById = async (id: any) => {
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+API_KEY+'&language=en-US');
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
}

//https://api.themoviedb.org/3/movie/536554/external_ids \

export const getMovieSocialDataById = async (id: any) => {
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/movie/'+id+'/external_ids?api_key='+API_KEY+'&language=en-US');
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
} */

/* export const fetchPopularMovies = async(page = 1) => {    
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4e4bc47055e1031e55167e2121a053ac&page='+page);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
}

export const fetchTopRatedMovies = async(page = 1) => {    
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=4e4bc47055e1031e55167e2121a053ac&language=en-US&page='+page);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
}

export const fetchUpcomingdMovies = async(page = 1) => {    
   try {
      const resp = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=4e4bc47055e1031e55167e2121a053ac&language=en-US&page='+page);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
}

export const fetchNowPlayingMovies = async(page = 1) => {    
   try { 
      const resp = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=4e4bc47055e1031e55167e2121a053ac&language=en-US&page='+page);
      //console.log(resp);
      //dispatch(setStateMovies(resp.data.results));
      return resp.data;
      //setMovies(resp.data.results);
   } catch (error) {
      console.log(error)
   }
} */

