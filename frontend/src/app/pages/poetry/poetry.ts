import { Component, inject, OnInit, signal } from '@angular/core';
import { Poem } from '../../models/poem';
import { Catalog } from '../../services/catalog';
import { PoemCard } from '../../shared/poem-card/poem-card';

@Component({
  selector: 'app-poetry',
  imports: [PoemCard],
  templateUrl: './poetry.html',
  styleUrl: './poetry.css',
})
export class PoetryPage implements OnInit {
  private readonly catalog = inject(Catalog);
  protected readonly poems = signal<Poem[]>([]);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.catalog.listPoems().subscribe({
      next: (items) => this.poems.set(items),
      error: (err: Error) => this.error.set(err.message),
    });
  }
}
