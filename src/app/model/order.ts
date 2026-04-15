import { Package } from "./package"

export interface Order {
	order_amount: number
    order_currency:string
    order_id: string
    customer_details:any
    order_meta:any

    mobileNo:string;
	txnResponse:any;
	createdAt:number;
	txnStatus:String;
	coinAmount:number;
    packageDetails:Package|undefined;
    
}