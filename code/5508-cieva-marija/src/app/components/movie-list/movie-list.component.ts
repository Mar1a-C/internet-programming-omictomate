import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  getOscarCount(movie: any): number {
    return movie.oscars ? Object.keys(movie.oscars).length : 0;
  }
  
  deleteMovie(id: number): void {
    if (confirm("Are you sure you want to delete this movie?")) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.movies = this.movies.filter(movie => movie.id !== id);
      });
    }
  }


  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }
}
