export class mGrado {
    grad_id :any;
    grad_nombre:string;
    sed_id:any;
    secgrad_id:any;
    est_id:any;
    jor_id:any;
    grad_costoins:any;
    grad_costocuota:any;    
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }