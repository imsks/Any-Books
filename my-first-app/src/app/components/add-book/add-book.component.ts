import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  author: any;
  title: any;
  price: any;
  dateadded: any;
  dateread: any;
  description: any;
  imageUrl: any;
  rate: any;
  isRead: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  updateDateAdded(dateAdded: any) {
    this.dateadded = dateAdded;
    console.log('hi');
  }

  updateDateRead(dateRead: any) {
    this.dateread = dateRead;
    this.isRead = true;
    console.log('hi');
  }

  submitAdd() {
    const book = {
      author: this.author,
      title: this.title,
      price: this.price,
      dateadded: this.dateadded,
      dateread: this.dateread,
      description: this.description,
      rate: this.rate,
      imageUrl: this.imageUrl,
    };
    this.firebaseService.addBook(book);
    // this.router.navigate(['/books']);
  }
}
