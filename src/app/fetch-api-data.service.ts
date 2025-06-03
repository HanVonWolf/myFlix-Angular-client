import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://hannahs-myflix-03787a843e96.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private getStoredToken(): any {
    return localStorage.getItem('token');
  }

  private getStoredUser(): any {
    return JSON.parse(localStorage.getItem("user") || "");
  }

 /**
  * Registers a new user
  * @param Request body has following user info: Username, Password, Email and Birthday
  * @returns - A JSON object of user info
  */
  public userRegistration(userDetails: any): Observable<any> {

    const data = {
      userName: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      birthDate: userDetails.birthday
    };

    return this.http.post(apiUrl + 'users', JSON.stringify(userDetails), {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * User can login
   * @param request body contains userDetails - Username and Password 
   * @returns A JSON object with user's data
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Shows all movies
   * @returns - JSON array of all movies in database 
   */
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Show one movie by searching by title
   * @param title - the title of searched for movie
   * @returns - a JSON object with searched for movie info.
   */
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Search for director by name
   * @param directorName - the name of the director
   * @returns - a JSON object with director's info
   */
  public getDirector(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Search for a genre by name
   * @param genreName - the name of the genre 
   * @returns - a JSON object with genre info
   */
  public getGenre(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Shows all users
   * @returns - JSON array of all movies in database 
   */
  public getAllUses() {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * add a movie to the user's favourite movies list
   * @param movieId - the ID of the movie
   * @returns - a JSON object of user's info
   */
  public addUserFavoriteMovie(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.put(apiUrl + 'users/' + user.userName + '/favorite/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a movie from the favourite movie's list
   * @param movieId - the ID of the movie
   * @returns - a JSON object with user's info
   */
  public deleteUserFavoriteMovie(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.delete(apiUrl + 'users/' + user.userName + '/favorite/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edit/update a user's info
   * @param updatedUser - the updated user information (Username, Password, Email, Birthday)
   * @returns - a JSON object with updated user's info
   */
  public editUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.put(apiUrl + 'users/' + user.userName, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a user's account
   * @returns - an alert message that the user's account was deleted
   */
  public deleteUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.delete(apiUrl + 'users/' + user.username, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {

    const body = res;
    return body || {};
  }
}