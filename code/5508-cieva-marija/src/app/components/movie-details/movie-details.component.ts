import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movie: any = {};

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  get oscarKeys(): string[] {
    return Object.keys(this.movie?.oscars || {});
  }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(data => {
      this.movie = data;
    });
  }

  deleteMovie(): void {
    if (confirm("Are you sure you want to delete this movie?")) {
      this.movieService.deleteMovie(this.movie.id).subscribe(() => {
        window.location.href = '/movies'; // Redirect after deletion
      });
    }
  }
}
