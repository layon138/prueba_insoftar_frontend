import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PageUsuarioComponent } from './usuario/page-usuario/page-usuario.component';
import { InsertUsuarioComponent } from './usuario/components/insert-usuario/insert-usuario.component';
import { ListaUsuarioComponent } from './usuario/components/lista-usuario/lista-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    PageUsuarioComponent,
    InsertUsuarioComponent,
    ListaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    ToastModule,
    RippleModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
