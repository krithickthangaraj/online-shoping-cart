import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bannerImgs = [
    { id: 1, img: '../../assets/images/banner/ef637eb93bf1a887.webp' },
    { id: 2, img: '../../assets/images/banner/9021283f0be266c1.webp' },
    { id: 3, img: '../../assets/images/banner/7dcc28ed89760319.webp' }
  ];

  constructor() { }

  ngOnInit(): void {}
}
