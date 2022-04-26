import { Directive,Output, EventEmitter, HostBinding, HostListener, HostBindingDecorator } from '@angular/core';

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {

  @Output() onFileDropped = new EventEmitter<any>();
 // @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';
  
  //Dragover listener, when something is dragged over our host element
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
   // this.background = '#9ecbec';
   // this.opacity = '0.8'
  };

  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    //this.background = '#fff'
    //this.opacity = '1'
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    //this.background = '#f5fcff'
   // this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

  constructor() { }

}