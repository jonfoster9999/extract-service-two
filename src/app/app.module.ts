import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostService } from 'src/app/services/post.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
