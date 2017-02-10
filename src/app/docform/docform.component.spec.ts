/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DocformComponent } from './docform.component';

describe('DocformComponent', () => {
  let component: DocformComponent;
  let fixture: ComponentFixture<DocformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
