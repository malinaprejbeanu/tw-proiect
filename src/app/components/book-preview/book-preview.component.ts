import { Component, Input, OnInit } from '@angular/core';
import { Book } from "../../interfaces/book";

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent implements OnInit {
  @Input() book: Book = {id: "",
    volumeInfo: {
      authors: [],
      averageRating: 0,
      description: "",
      imageLinks: {smallThumbnail: "", thumbnail: ""},
      publishDate: "",
      publisher: "",
      ratingsCount: 0,
      subtitle: "",
      title: ""
    }
  };

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
