import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-traduction',
  templateUrl: './traduction.component.html',
  styleUrls: ['./traduction.component.css']
})
export class TraductionComponent implements OnInit {

  title: string = '';
  text: string = '';
  translatedText: string = '';
  translations: any[] = [];

  constructor(
    private sharedservice: SharedService, 
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.title = this.sharedservice.getTitle();
    this.getTranslations(this.title);
  }
  
  onTextInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.text = target.value;
    console.log('Input:', this.text);
  }

  translateText(): void {
    this.translationService.translate(this.text, this.title).subscribe(
      (response) => {
        this.translatedText = response.translated_text;
      },
      (error) => {
        console.error('Error translating text:', error);
      }
    );
  }

  getTranslations(field: string): void {
    this.translationService.get_translation(field).subscribe(
      (data) => {
        this.translations = data;
        console.log('Fetched translations:', this.translations);
      },
      (error) => {
        console.error('Error fetching translations:', error);
      }
    );
  }

  saveTranslations(field: string, english_text: string, translation:string): void{
    this.translationService.save_translation(field, english_text, translation).subscribe(
      (response) => {
        console.log(response, 'field: ',field ,'English Text:', english_text, 'Translation:', translation, 'SAVED !')
      },
      (error) => {
        console.error('Error saving translation:', error);
      }
    )
  }

  clearFields(): void {
    this.text = '';
    this.translatedText = '';
  }

  gotohome(): void {
    this.router.navigate(['']);
  }
}