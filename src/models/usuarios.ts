export class usuario {
   id_usuario:any;
   email:string;
   nombre:string;
   password:string;


   constructor(obj: any = null)
   {
       if(obj != null)
       {
           Object.assign(this, obj);
       }
   }

  }