import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IgxAvatarModule, IgxFilterModule, IgxIconModule, IgxInputGroupModule, IgxListModule } from 'igniteui-angular';
import { ListComponent } from './list.component';

xdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
	 imports: [FormsModule, IgxAvatarModule, IgxFilterModule, IgxIconModule, IgxInputGroupModule, IgxListModule, ListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
