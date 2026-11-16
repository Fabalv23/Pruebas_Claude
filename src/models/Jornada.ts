export class Jornada {
    id_jornada:any;
    nombre:string;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }