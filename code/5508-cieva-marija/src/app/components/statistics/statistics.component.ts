import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  totalMovies: number = 0;
  totalActors: number = 0;
  totalGenres: number = 0;
  totalOscars: number = 0;
  moviesPerGenre: any = {};
  moviesPerDecade: any = {};
  unknownActors: number = 0;
  unknownMovies: number = 0;

  constructor(private movieService: MovieService, private actorService: ActorService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      if (movies) {
        this.totalMovies = movies.length;
        this.moviesPerGenre = this.countOccurrences(movies, 'genre');
        this.moviesPerDecade = this.countDecades(movies);
        this.totalOscars = movies.reduce((sum, movie) => sum + (movie.oscars ? Object.keys(movie.oscars).length : 0), 0);
      }
    });

    this.actorService.getActors().subscribe(actors => {
      if (actors) {
        this.totalActors = actors.length;
        this.unknownActors = actors.filter(actor => !actor?.birthdate || !actor?.height || !actor?.nationality).length;
      }
    });
  }

  countOccurrences(items: any[], key: string): any {
    const countMap: any = {};
    items.forEach(item => {
      const values = Array.isArray(item[key]) ? item[key] : [item[key]];
      values.forEach(value => {
        if (value) countMap[value] = (countMap[value] || 0) + 1;
      });
    });
    return countMap;
  }

  countDecades(movies: any[]): any {
    const countMap: any = {};
    movies.forEach(movie => {
      const decade = Math.floor(movie.year / 10) * 10;
      countMap[decade] = (countMap[decade] || 0) + 1;
    });
    return countMap;
  }

  get genreKeys(): string[] {
    return Object.keys(this.moviesPerGenre || {});
  }

  get decadeKeys(): string[] {
    return Object.keys(this.moviesPerDecade || {});
  }
}
