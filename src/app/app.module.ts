import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OurPoliciesComponent } from './pages/our-policies/our-policies.component';
import { RefundCancellationComponent } from './pages/refund-cancellation/refund-cancellation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListEnquiryComponent } from './pages/list-enquiry/list-enquiry.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInDialogComponent } from './signIn-dailog/signIn-dailog.component';
import { ErrorDailogComponent } from './error-dailog/error-dailog.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProductsComponent,
        AboutComponent,
        ContactUsComponent,
        OurPoliciesComponent,
        RefundCancellationComponent,
        ListEnquiryComponent,
        SignInDialogComponent,
        ErrorDailogComponent,
     
       
       
           
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatChipsModule,
        ImageSliderComponent,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
    ]
})
export class AppModule { }
