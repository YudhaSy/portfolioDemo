import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ContactService} from "./service/contact/contact.service";
import {FormBuilder} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {ContentService} from "./service/content/content.service";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let contactService: ContactService;
  let contentServiceMock;

  beforeEach(async(() => {
    contentServiceMock = jasmine.createSpyObj(['getContentJSON']);
    contentServiceMock.getContentJSON.and.returnValue(of({
      title: 'Yudha Syarifudin'
    }));
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FormBuilder,
        ContactService,
        {provide: ContentService, useValue: contentServiceMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    contactService = TestBed.inject<ContactService>(ContactService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call content service when form submitted and payload is not empty', () => {
    const payload = {name: 'John Doe', email: 'john@email.com', message: 'hello world!'};
    spyOn(contactService, 'sendContactEmail').and.callFake(function() {
      return of();
    });

    component.onSubmit(payload);

    expect(contactService.sendContactEmail).toHaveBeenCalledWith(payload);
  });

  it('should not submit form when one of the payload property is undefined', () => {
    const payload = {name: 'John Doe', email: undefined, message: 'hello world!'};
    spyOn(contactService, 'sendContactEmail').and.callFake(function() {
      return of();
    });

    component.onSubmit(payload);

    expect(contactService.sendContactEmail).not.toHaveBeenCalled();
  });
});
