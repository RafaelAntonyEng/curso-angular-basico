import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
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
    this.log("obtida lista de heróis.")

    return this.http.get<Hero[]>(this.heroesUrl);

    // return of(HEROES);
  }

  getHero(id: Number): Observable<Hero> {
    this.log(`obtido hero id=${id}`);

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`);

    // return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
}
