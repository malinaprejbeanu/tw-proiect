import { Component, EventEmitter, Output } from '@angular/core';
import { GoogleBooksService } from "../../services/google-books.service";
import { Router } from "@angular/router";
import { EStore } from "@fireflysemantics/slice";
import { Book } from "../../interfaces/book";
import { debounceTime, distinctUntilChanged, filter, tap } from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  @Output() goToOrdersEmitter = new EventEmitter<Book>();

  constructor(
    private gbs: GoogleBooksService,
    private router: Router,
  ) {}

  bookStore: EStore<Book> = new EStore<Book>();
  books$ = this.bookStore.observe();
  query$ = this.bookStore.observeQuery();
  public books: Book[] = [];

  search(target: any) {
    this.bookStore.query = target.value;
    this.bookStore.reset();
    this.query$.pipe(
      filter(Boolean),
      debounceTime(150),
      distinctUntilChanged(),
      tap(async (query:string) => {
        this.gbs.search(query).subscribe((result) => {
          this.books = result;
          this.bookStore.reset();
          this.bookStore.postA(this.books);
        });
      })
    ).subscribe();
  }

  public goToOrders(book: Book): void {
    this.goToOrdersEmitter.emit(book);
  }
}
