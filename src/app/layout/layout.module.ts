import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';



import {GalleriaModule} from 'primeng/galleria';
import {ButtonModule, PanelModule, SharedModule, SidebarModule} from 'primeng/primeng';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {Mainbody2Component} from './mainbody2/mainbody2.component';
import {SharedmoduleModule} from '../SharedModule/sharedmodule.module';


@NgModule({
  declarations: [IndexComponent,HeaderComponent,Mainbody2Component],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedmoduleModule,
    GalleriaModule,
    SharedModule,

  ],
  exports: [IndexComponent,HeaderComponent,Mainbody2Component],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutModule {
}
