import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  filter = '';

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.messageService.add(`HeroesComponent: selecionado id=${hero.id}`)
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onAdd(name: string) {
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      if (hero) {
        this.heroes.push(hero);
      }
    });
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe((response) => {
      if (typeof response !== 'undefined') {
        this.heroes = this.heroes.filter((heroItem) => heroItem !== hero);
      }
    });
  }

  onFilter(term: string) {
    this.filter = term;
  }


}
