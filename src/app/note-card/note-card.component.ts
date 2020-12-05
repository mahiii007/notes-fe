import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: String;
  @Input() body: String;
  @Input() link: String;
  @Output('delete') deleteEvent: EventEmitter <void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    //work if there is text overflow otherwise block the truncator
    let style = window.getComputedStyle(this.bodyText.nativeElement, null); //to get css style
    let viewableHeight = parseInt(style.getPropertyValue("height"),10);


    if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
  onxButtonClick(){
    this.deleteEvent.emit();
  }

}
