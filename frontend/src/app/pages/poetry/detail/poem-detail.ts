import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Poem } from '../../../models/poem';
import { Catalog } from '../../../services/catalog';

@Component({
  selector: 'app-poem-detail',
  imports: [RouterLink],
  templateUrl: './poem-detail.html',
  styleUrl: './poem-detail.css',
})
export class PoemDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(Catalog);

  protected readonly poem = signal<Poem | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('השיר לא נמצא');
      this.loading.set(false);
      return;
    }

    this.catalog.getPoem(id).subscribe({
      next: (item) => {
        this.poem.set(item);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
