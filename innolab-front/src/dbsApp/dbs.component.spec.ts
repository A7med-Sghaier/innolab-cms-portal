import { TestBed, async } from '@angular/core/testing';
import { DbsComponent } from './dbs.component';
describe('DbsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DbsComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(DbsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'innolab-front'`, async(() => {
    const fixture = TestBed.createComponent(DbsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('innolab-front');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(DbsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to innolab-front!');
  }));
});
