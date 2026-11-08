import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Poem } from '../../models/poem';

@Component({
  selector: 'app-poem-card',
  imports: [RouterLink],
  templateUrl: './poem-card.html',
  styleUrl: './poem-card.css',
})
export class PoemCard {
  readonly poem = input.required<Poem>();

  excerpt(): string {
    const body = this.poem().body.trim();
    return body.length > 72 ? `${body.slice(0, 72)}…` : body;
  }
}
