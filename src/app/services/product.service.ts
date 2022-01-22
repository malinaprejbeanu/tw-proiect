import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url = 'http://localhost:5100/api/products';

  constructor(
    public http: HttpClient,
  ) { }

  public getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

  public addProduct(product: any): Observable<any> {
    const options = {
      headers: new HttpHeaders(),
      body: product
    };
    return this.http.post<any>(`${this.url}`, product, options);
  }

  public deleteProduct(product: any): Observable<any> {
    return this.http.delete(`${this.url}/${product.BookId}`);
  }
}
