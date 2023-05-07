import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data.service';
import { getCatalogDataService } from './services/userService/getCatalogData.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public customNumberValue = 12345;
  constructor(
    private dataService: DataService,
    private getCatalogDataService: getCatalogDataService,
    private translate: TranslateService
  ) {
    this.dataService.load();
    this.getCatalogDataService.loadProducts();
    translate.setDefaultLang('en');
    translate.use('en');
  }

  onLanguageChange(item: any) {
    this.translate.use;
    item.value;
  }
}

// json-server --watch userlist.json

