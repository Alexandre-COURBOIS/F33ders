import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BootstrapIconsModule} from "ng-bootstrap-icons";
import {Alarm} from 'ng-bootstrap-icons/icons'

const icons = {
  Alarm,
}

@NgModule({
  declarations: [],
  imports: [
    BootstrapIconsModule.pick(icons),
    CommonModule
  ]
})
export class IconsModule {
}
