import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  sections = ['IFRS', 'ITIL', 'Procurement']
  
  constructor(private router : Router, private sharedservice : SharedService) {}

  gotohome(){
    this.router.navigate([''])
  }

  gototrad(title: string){
    this.sharedservice.setTitle(title)
    this.router.navigate(['/traduction', title]);
  }


}
