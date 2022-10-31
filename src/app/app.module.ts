import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Highlight } from './highlight.directive';
import { BetterHighlight } from './better-highlight.directive';
import { AppRoutingModule } from './app-routing.module';
import{ HttpClientModule} from '@angular/common/http'
import { ShareModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Highlight,
    BetterHighlight,
   
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    CoreModule,
    
   
   
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
