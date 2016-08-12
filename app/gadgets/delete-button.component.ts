import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-button',
  templateUrl: 'app/gadget/delete-button.component.html'
})
export class DeleteButtonComponent{
  @Output() xclick: EventEmitter<any> = new EventEmitter();

  constructor(){

  }

  ngOnInit(){

  }

  clicked(){
    if(confirm("Du bist dabei dieses Element zu löschen!") === true){
      this.xclick.emit(null);
    }
  }

}
