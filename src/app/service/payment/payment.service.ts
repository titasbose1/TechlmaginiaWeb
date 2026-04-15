import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rootUrl = "https://www.my-pg.in:9090/v1/salex/payment";
  //rootUrl = "http://localhost:8081/v1/salex/payment";

  constructor(private http : HttpClient) { }

  headers= new HttpHeaders({
   'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
   'Access-Control-Allow-Origin': '*',
   //'Access-Control-Allow-Origin': AppConstants.allowHeaderUrl,
    'Access-Control-Allow-Credentials': 'true',
    'mode':'no-cors'
  })

  createOrder(req: Order) {
    return this.http.post(this.rootUrl+"/order/create" , req,{headers: this.headers})
  }
  updateOrder(order_id: string) {
    return this.http.post(this.rootUrl+"/order/update/"+order_id ,{headers: this.headers})
  }

  // getRandomAdsByStateCity(state_city_code:string,range:number) {
  //   return this.http.post(AppConstant.BASE_URL+AppConstant.POST+AppConstant.STATE_CITY_POSTS+state_city_code+'/'+range ,{headers: this.headers})
  // }

  getOrderStatus(orderId:string,postId:string) {
    return this.http.post(this.rootUrl+"/order/status/"+orderId+'/'+postId ,{headers: this.headers})
  }

  getAllMyOrders(mobile : string): Observable<Object>{
    return this.http.get(this.rootUrl+"/order/getAll/"+mobile);
  }

}
