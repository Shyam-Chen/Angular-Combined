import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule
} from '@angular/material';
import { MobxAngularModule } from 'mobx-angular';

import { TemplateDrivenComponent } from './template-driven.component';
import { TemplateDrivenStore } from './template-driven.store';

const ROUTES: Routes = [
  { path: '', component: TemplateDrivenComponent }
];

@NgModule({
  imports: [
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,

    MobxAngularModule,

    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TemplateDrivenComponent
  ],
  providers: [
    TemplateDrivenStore
  ]
})
export class TemplateDrivenModule {}