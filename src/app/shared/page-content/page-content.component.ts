import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataItemType } from 'src/app/service/content/content.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.less']
})
export class PageContentComponent implements OnInit {
  @Input() templateId = '';
  @Input() isCollapsed = true;
  @Input() isAnimated = true;
  @Input() dataItems;
  @Input() isFormContent;
  @Output() submit = new EventEmitter();
  @Output() goToRepo = new EventEmitter();

  DataItemType = DataItemType;
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.isFormContent) {
      this.setForm();
    }
  }

  /**
   * Set initial form
   */
  setForm() {
    //todo make this 3 fields as dynamic so parent component can push any number of fields instead of hardcoding
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  /**
   * Check to ensure form is valid. If so, send submission to parent
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // there is no need to do deep clone here
      const formValueCopy = Object.assign({}, this.form.value);
      let payload = {};
      this.dataItems.forEach(item => {
        if (formValueCopy[item.controlName]) {
          payload[item.controlName] = formValueCopy[item.controlName];
        }
      });
      if (Object.values(payload).length > 0) {
        this.submit.emit(payload);
        this.resetForm();
      }
    }
  }

  /**
   * Reset form to clear form fields once submitted, handling of error is not handled at this point
   */
  resetForm() {
    this.submitted = false;
    this.form.reset();
  }

  goToProjectLink(projectName, url) {
    this.goToRepo.emit({name: projectName, url: url});
  }
}
