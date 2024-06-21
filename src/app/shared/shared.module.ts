import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ExtractArrayValue} from '../pipe/extractvalue.pipe';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ExtractArrayValue,],
  imports: [CommonModule, RouterModule, FormsModule,],
  exports: [CommonModule, RouterModule, FormsModule,ExtractArrayValue]
})
export class SharedModule {
}
