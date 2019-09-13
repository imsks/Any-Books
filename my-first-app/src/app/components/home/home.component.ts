import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favoriteBooks: any;
  unreadBooks: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getFavoriteBooks().subscribe(favbooks => {
      this.favoriteBooks = favbooks;
      // console.log(this.favoriteBooks);
    });

    // For unread books
    this.firebaseService.getunreadBooks().subscribe(uBooks => {
      this.unreadBooks = uBooks;
      // console.log('Unread books', this.unreadBooks);
    });
  }
}
