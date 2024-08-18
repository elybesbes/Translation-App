import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})


export class MainpageComponent {
  cards = [
    { title: 'IFRS', image: '../../../assets/Finance.png' },
    { title: 'ITIL', image: '../../../assets/IT.png' },
    { title: 'Procurement', image: '../../../assets/Procurement.png' }
  ];
  

  constructor(private router : Router, private sharedservice : SharedService) {}
  
  gototrad(title: string){
    this.sharedservice.setTitle(title)
    this.router.navigate(['/traduction', title]);
  }

}
