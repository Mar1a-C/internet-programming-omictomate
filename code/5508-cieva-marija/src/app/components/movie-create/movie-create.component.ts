import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  movie = {
    title: '',
    year: null,
    director: '',
    genre: [],
    plot: '',
    rating: null,
    oscars: {}
  };

  constructor(private movieService: MovieService, private router: Router) {}

  saveMovie(): void {
    this.movieService.createMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}
