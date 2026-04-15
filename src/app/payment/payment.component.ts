import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//@ts-ignore
import { load } from '@cashfreepayments/cashfree-js'
import { PaymentService } from '../service/payment/payment.service';
import { Order } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from '../model/package';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  
  mobileNo: string = '';
  orderId: string = '';
  amount: number = 0;
  packageId: string = '';
  backFromPayment: boolean = false;
  selectedPackage: any;

    packages: Package[] = [
    {
    title: '1yr-basic',
    description: 'Basic package 1yr',
    price: 499,
    gst: 89.82,
    total: 588.82,
    posts: 'UNLIMITED',
    validTill: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime(),
    validity: '1yr',
    state: '',
    country: 'India',
    userName: '',
    mobileNo: this.mobileNo,
    order_id: '',
    status: 'CREATED'
  },
  {
    title: '6m-basic',
    description: 'Basic package 6m',
    price: 299,
    gst: 53.82,
    total: 352.82,
    posts: 'UNLIMITED',
    validTill: new Date(new Date().setMonth(new Date().getMonth() + 6)).getTime(),
    validity: '6m',
    state: '',
    country: 'India',
    userName: '',
    mobileNo: this.mobileNo,
    order_id: '',
    status: 'CREATED'
  },
    {
    title: '3m-basic',
    description: 'Basic package 3m',
    price: 199,
    gst: 35.82,
    total: 234.82,
    posts: 'UNLIMITED',
    validTill: new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime(),
    validity: '3m',
    state: '',
    country: 'India',
    userName: '',
    mobileNo: this.mobileNo,
    order_id: '',
    status: 'CREATED'
  }]


  constructor(    
    private paymentSvc: PaymentService,
    private router: Router,
    private route: ActivatedRoute,) { 
      const mobileNo = this.route.snapshot.paramMap.get('mobileNo');
      const amount = this.route.snapshot.paramMap.get('amount');
      const packageId = this.route.snapshot.paramMap.get('packageId');

      if (mobileNo) {
        this.mobileNo = mobileNo;
      }
      if (amount) {
        this.amount = parseFloat(amount);
      }
      if (packageId) {
        this.packageId = packageId;
      }
    }

  ngOnInit(): void {
    this.pay()
  }

  
  pay() {
    this.cashFreeRedirect()
  }

  async cashFreeRedirect() {
    this.selectedPackage=this.packages.find(p=>p.title==this.packageId)
    this.selectedPackage.order_id=this.orderId
    this.selectedPackage.total=this.amount

    const cashfree = await load({
      mode: "production" //or sandbox
    });
    this.orderId = this.mobileNo + "_" + new Date().valueOf()
    let adId = "X"

    var request: Order = {
      "order_amount": this.selectedPackage.total,
      "order_currency": "INR",
      "order_id": this.orderId,
      "customer_details": {
        "customer_id": this.mobileNo,
        "customer_phone": this.mobileNo
      },
      "order_meta": {
        //"return_url": "https://xdil.in/user/buyPacks/" + this.orderId 
        "return_url": "https://www.my-pg.in:9090/salex/v1/salex/payment/order/update/" + this.orderId 
      },
      "mobileNo": this.mobileNo,
      "txnResponse": '',
      "createdAt": 0,
      "txnStatus": '',
      "coinAmount": 0,
      "packageDetails": this.selectedPackage
    };
    this.paymentSvc.createOrder(request).subscribe(data => {
      let orderId = (data as any).payment_session_id
      let checkoutOptions = {
        paymentSessionId: orderId,
        redirectTarget: "_self" //optional ( _self, _blank, or _top)
      }
      cashfree.checkout(checkoutOptions).then((result: { error: any; redirect: any; paymentDetails: { paymentMessage: any; }; }) => {
        if (result.error) {
          // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
          console.log("User has closed the popup or there is some payment error, Check for Payment Status");
          console.log(result.error);
          alert('Payment Failed')
        }
        if (result.redirect) {
          // This will be true when the payment redirection page couldnt be opened in the same window
          // This is an exceptional case only when the page is opened inside an inAppBrowser
          // In this case the customer will be redirected to return url once payment is completed
          console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
          // This will be called whenever the payment is completed irrespective of transaction status
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails.paymentMessage);
          this.updatePaymentStatus()
        }
      });
    })

  }

  updatePaymentStatus() {
    this.paymentSvc.updateOrder(this.orderId).subscribe(
      data => {
        this.backFromPayment=true
        alert('payment success')
      },
      error => {
        alert('payment failed')
      }
    )
  }
}
