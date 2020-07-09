import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getHeroes() : Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log("obtida lista de heróis.")),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );

    // return of(HEROES);
  }

  getHero(id: Number): Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(() => this.log(`obtido hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero'))
    );

    // return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
