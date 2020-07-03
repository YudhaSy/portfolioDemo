import {Component, OnInit} from '@angular/core';
import {ContactService} from './service/contact/contact.service';
import {ContentService} from "./service/content/content.service";
import {Page} from "./model/page.model";
import {IpService} from "./service/ip.service";

export interface EmailInterface {
  name: string,
  email: string,
  message: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  mainDataItems: Page;
  alerts: any[] = [];
  reportingEmail: EmailInterface = {
    name: 'System',
    email: 'N/A',
    message: ''
  };

  constructor(private contactService: ContactService,
              private contentService: ContentService,
              private ipService: IpService) {
    this.contentService.getContentJSON().subscribe(data => {
      this.mainDataItems = data;
    });
    this.sendIpReporting('initialLoad');
  }

  ngOnInit() {}

  /**
   * handle Github link request
   */
  goToLink(projectName, url) {
    this.sendIpReporting(projectName);
    window.open(url, "_blank");
  }

  private sendIpReporting(projectName) {
    // active email notification of ip addr on top of Google analytics.
    this.ipService.getIPAddress().subscribe(data => {
      this.reportingEmail.message = projectName + ', ipObj: ' + data['ip'].toString();
      this.onSubmit(this.reportingEmail);
    });
  }

  /**
   * Handle contact submit form when all fields are not empty
   *
   * @param payload payload data
   */
  onSubmit(payload) {
    //todo handle error
    if (payload.name !== undefined && payload.email !== undefined && payload.message !== undefined) {
      this.contactService.sendContactEmail(
        {
          name: payload.name,
          email: payload.email,
          message: payload.message
        }).subscribe(response => {
          if (payload.name !== this.reportingEmail.name) {
            this.showSuccessAlert(payload.name);
          }
      });
    }
  }

  /**
   * Show success alert when submission is successful
   *
   * @param name name of contact
   */
  showSuccessAlert(name): void {
    const message = 'Thank you, ' + name + '.' + ' Your email has been successfully sent out!';
    this.alerts = [];
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: 3000
    });
  }

  /**
   * Set selected menu item to show corresponding content and hide previous content
   *
   * @param contentId content id
   */
  showContent(contentId) {
    this.mainDataItems.contents.forEach(item => {
      item.isCollapsed = item.id !== contentId;
    });
  }
}
