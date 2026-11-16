export class mMunicipio {
    muni_id :any;
    municipio:string;
    dep_id:any;
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }