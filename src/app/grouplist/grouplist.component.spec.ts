/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrouplistComponent } from './grouplist.component';

describe('GrouplistComponent', () => {
  let component: GrouplistComponent;
  let fixture: ComponentFixture<GrouplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
