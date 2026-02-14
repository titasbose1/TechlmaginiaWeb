import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OurPoliciesComponent } from './pages/our-policies/our-policies.component';
import { RefundCancellationComponent } from './pages/refund-cancellation/refund-cancellation.component';
import { ListEnquiryComponent } from './pages/list-enquiry/list-enquiry.component';
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contactUs', component: ContactUsComponent},
  { path: 'our-policies', component: OurPoliciesComponent },
  { path: 'refund-cancellation', component: RefundCancellationComponent },
  { path: 'listEnquiry',component: ListEnquiryComponent,canActivate: [AuthGuard],},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
