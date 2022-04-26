import { Component, OnInit } from '@angular/core';
import { fadeInAnimationForLoader } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-loader',
  animations: [fadeInAnimationForLoader
  ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    public allServ: AllServicesService) { }

  ngOnInit(): void {
  }

}
