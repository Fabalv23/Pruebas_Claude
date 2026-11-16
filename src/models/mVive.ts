export class mVive {
    vive_id :any;
    vive_nombre:string;    
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }