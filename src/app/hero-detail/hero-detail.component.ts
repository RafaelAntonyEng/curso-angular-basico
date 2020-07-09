import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero.model';
import { ActivatedRoute } from "@angular/router";
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id).subscribe(result => this.hero = result);
  }

  goBack() {
    this.location.back();
  }

}
