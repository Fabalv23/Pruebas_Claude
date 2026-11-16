export class mSexo {
    id_sexo :any;
    sexo:string;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }