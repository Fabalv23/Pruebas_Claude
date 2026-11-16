export class mNacionalidad {
    nac_id :any;
    nacionalidad:string;
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }