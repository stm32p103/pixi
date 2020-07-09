import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Application } from 'pixi.js'
import { ResizeService } from './services/resize.service'
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private destroy = new Subject();
  @ViewChild('containerCanvas') container;
  pixi: Application;
  constructor( private resize: ResizeService ){}

  ngAfterViewInit() {
    this.pixi = new Application( { view: this.container.nativeElement } );
    this.pixi.renderer.resize( window.innerWidth, innerHeight );
    this.resize.inner.pipe( map( size => this.pixi.renderer.resize( size.w, size.h ) ), takeUntil( this.destroy ) ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
