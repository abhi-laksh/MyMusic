export const LIBRARY_STATUS = 'LIBRARY_STATUS';
export const LIBRARY_QUEUE = 'LIBRARY_QUEUE';
export const LIBRARY_FAVOURITES = 'LIBRARY_FAVOURITES';


export function libraryStatus(newLoad,fetching, error, ) {
  return {
    type: LIBRARY_STATUS,
    fetching: fetching,
    error: error,
    newLoad: newLoad,
  }
}