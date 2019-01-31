import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthEffects } from './store/auth.effects';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    // StoreModule.forFeature(authStoreName, authReducer, {
    //   initialState,
    //   metaReducers: authMetaReducers,
    // }),
    // StoreModule.forFeature(loginPageStoreName, loginPageReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent, LogoutComponent], // LoginPageComponent, LoginFormComponent
})
export class AuthModule {}
