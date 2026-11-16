export class mEtnico {
    etnico_id :any;
    etnico_nombre:string;    
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }