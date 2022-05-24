import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';


import { SalesDetailsComponent } from './sales-details.component';

@Pipe({name: 'transformDate'})
class MockPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    //Do stuff here, if you want
    return value;
  }
}

describe('SalesDetailsComponent', () => {
  let component: SalesDetailsComponent;
  let fixture: ComponentFixture<SalesDetailsComponent>;

  beforeEach(async () => {
    window.history.pushState({ }, '', '');

    await TestBed.configureTestingModule({
      declarations: [
        SalesDetailsComponent,
        MockPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
