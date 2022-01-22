import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from "./components/wallet/wallet.component";
import { BooksComponent } from "./components/books/books.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    pathMatch: 'full',
    component: BooksComponent,
  },
  {
    path: 'wallet',
    pathMatch: 'full',
    component: WalletComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
