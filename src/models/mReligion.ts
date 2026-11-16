export class mReligion {
    rel_id :any;
    religion:string;
    est_id:any;
 
 
    constructor(obj: any = null)
    {
        if(obj != null)
        {
            Object.assign(this, obj);
        }
    }
 
}