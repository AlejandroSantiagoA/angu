import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.services';
import { environment } from '../../../enviroments/enviroment';
import { Article, NewsResponse } from '../../interfaces';


const apikey =environment.apikey;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public articles: Article[] = [];

  constructor(private newService: NewsService){}
  

  ngOnInit(): void {

    this.newService.getTopHeadlines()
    .subscribe( articles => this.articles.push(...articles) );
    this.getProducts();
  }

  getProducts() {
  
  }
  

}