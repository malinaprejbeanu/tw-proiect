import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../services/order.service";
import { MatDialogConfig } from "@angular/material/dialog";
import { Book } from "../../interfaces/book";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public orders: any[] = [];
  public books: any[] = [];
  public displayedColumnsOrders = ['orderId', 'quantity', 'price', 'delete'];
  public displayedColumnsBooks = ['bookId', 'name', 'price', 'delete'];
  @Input() selectedBook: Book = {
    id: "",
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

  constructor(
    private router: Router,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getOrders();
    this.getBooks();
    console.log(this.selectedBook);
    this.addProduct();
  }

  public getOrders(): void {
    this.orderService.getOrders().subscribe(
      (result: any[]) => {
        this.orders = result;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public getBooks(): void {
    this.productService.getProducts().subscribe((result) => {
      this.books = result;
    });
  }

  public addProduct(): void {
    const book = {
      Name: 'name',
      Price: 10,
    };
    this.productService.addProduct(book).subscribe((result) => {

    });
  }

  public deleteBook(book: any): void {
    this.productService.deleteProduct(book).subscribe(
      (result: any) => {
        this.getBooks();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public deleteOrder(order: any): void {
    this.orderService.deleteOrder(order).subscribe(
      (result: any) => {
        this.getOrders();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public openModal(order?: any): void {
    const data = {
      order
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.height = '700px';
    dialogConfig.data = data;
    // const dialogRef = this.dialog.open(AddEditOrderComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     this.getOrders();
    //   }
    // });
  }

  public addNewOrder(): void {
    this.openModal();
  }

  public editOrder(student: any): void {
    this.openModal(student);
  }

}
