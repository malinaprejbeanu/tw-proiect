import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public url = 'http://localhost:5100/api/orders';

  constructor(
    public http: HttpClient,
  ) { }

  public getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

  public deleteOrder(order: any): Observable<any> {
    return this.http.delete(`${this.url}/${order.OrderId}`);
  }
}
