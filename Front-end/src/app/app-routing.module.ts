import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { TraductionComponent } from './pages/traduction/traduction.component';


const routes: Routes = [
  {path : '', component: MainpageComponent},
  {path : 'traduction/:title', component: TraductionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
