export class validar_inscripcion {
    id_inscripcion :any;
	codigo :any;
	fase1 :any;
	fase2 :any;
	fase3 :any;
	fase4 :any;
	des_fase1 :any;
	des_fase2 :any;
	des_fase3 :any;
	des_fase4 :any;
	Est_id :any;
	ciclo :any;
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
   }