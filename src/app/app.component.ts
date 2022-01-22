import { Component } from '@angular/core';
import { Book } from "./interfaces/book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showWallet: boolean = false;
  public selectedBook: Book = {id: "",
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

  public receiveEmitter(event: any) {
    this.selectedBook = event;
    this.showWallet = true;
  }
}
