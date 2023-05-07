import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getCatalogDataService } from './../../services/userService/getCatalogData.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.page.html',
  styleUrls: ['./logged-in.page.scss'],
})
export class LoggedInPage implements OnInit {
  Data: any;

  constructor(
    private router: Router,
    private getProductData: getCatalogDataService,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit() {
    this.getProductData.getProductData().subscribe((data) => {
      console.log(data);
      this.Data = data;
    });
  }

  public changeLanguage(event: any) {
    this.translateService.use(event.target.value);
  }

  getProductDetails() {
    this.getProductData.getProductData().subscribe((el) => {
      console.warn(el);
    });
  }

  onLogout() {
    this.router.navigate(['login']);
    sessionStorage.clear();
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    autoplay: false,
  };
}
