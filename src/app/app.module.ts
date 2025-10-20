import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TemplateModule } from './template/template.module';
import { SistemaModule } from './sistema/sistema.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/configs/auth.service';
import { TokenInterceptor } from './services/configs/token.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EsqueciSenhaComponent } from './recuperar-senha/esqueci-senha/esqueci-senha.component';
import { ResetPasswordComponent } from './recuperar-senha/reset-password/reset-password.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    ForbiddenComponent,
    EsqueciSenhaComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    HttpClientModule,
    SistemaModule,
    FormsModule,
    NgbModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory }),
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
