import { Component, OnInit } from '@angular/core';

import { GrabberCollectorService } from './grabbercollector.service';

@Component({
  selector: 'app-garbagecollector',
  templateUrl: './garbagecollector.component.html',
  styleUrls: ['./garbagecollector.component.scss'],
  providers: [GrabberCollectorService]
})
export class GarbagecollectorComponent implements OnInit {
	uploading: boolean;
	mode: number;
  files: Array<string> = [];

  constructor(public grabber: GrabberCollectorService) { }

  ngOnInit() {
  	this.uploading = false;
  	this.mode = 0; //scanning
  }

  getMode() {
  	return this.mode;
  }

  onClick() {
  	if (this.getMode() == 1) {
        this.grabber.clear()
        .subscribe(
          (files) => {this.files = ['Файлы удалены!']; this.mode = 0 }
        )
    } else {
        this.grabber.scann()
        .subscribe(
          (files) => { 
                       if (files.length > 0) {this.files = files; this.mode = 1 } 
                       else {this.files = ['Нет файлов для удаления'] }}
        )
    }
  }

}
