export class mEstadoCivil {
    estado_id :any;
    estado_nombre:string;    
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }