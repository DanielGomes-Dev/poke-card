import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { DetailsTypesComponent } from './details-types.component';

describe('DetailsTypesComponent', () => {
  let component: DetailsTypesComponent;
  let fixture: ComponentFixture<DetailsTypesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
	  imports: [FormsModule, IgxCategoryChartModule, DetailsTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
