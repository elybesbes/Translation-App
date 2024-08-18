import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private title: string='';

  setTitle(title:string):void{
    this.title = title;
  }

  getTitle():string{
    return this.title
  }
}
