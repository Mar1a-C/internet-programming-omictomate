import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {
  actor: any = {};

  constructor(private route: ActivatedRoute, private actorService: ActorService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(id).subscribe(data => {
      this.actor = data;
    });
  }
}
