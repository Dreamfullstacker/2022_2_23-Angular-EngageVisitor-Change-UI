import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
  template: `
    <button (click)="show = !show">toggle show ({{show}})</button>

    <div *ngIf="show" [@enterAnimation]>xxx</div>
  `,
  //templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  show:boolean = false;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

}
