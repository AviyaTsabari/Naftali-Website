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
    const firstParagraph = this.poem().body.trim().split(/\n\s*\n/)[0].replace(/\n/g, ' ');
    return firstParagraph.length > 72 ? `${firstParagraph.slice(0, 72)}…` : firstParagraph;
  }
}
