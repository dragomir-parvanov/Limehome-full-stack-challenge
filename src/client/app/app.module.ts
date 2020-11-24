import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertySwiperComponent } from './components/property-swiper/property-swiper.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, MapComponent, PropertySwiperComponent, PropertyCardComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
