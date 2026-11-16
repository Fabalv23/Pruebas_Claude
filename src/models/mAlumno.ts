export class mAlumno {
    alumno_id: any;
    alumno_primernombre: string;
    alumno_segundonombre: string;
    alumno_tecernombre: string;
    alumno_primerapellido: string;
    alumno_segundoapellido: string;
    alumno_clave: any;
    alumno_codigo: string;
    alumno_sexo: any;
    alumno_random: any;
    est_id: any;
    estu_id: any;
    alumno_fechanacimiento: Date;
    edad: any;
    nac_id: any;
    rel_id: any;
    iglesia_asist: string;
    centro_proviene: string;
    centro_ubicacion: string;
    grad_id: any;
    est_antes: any;
    anio: any;
    mot_retiro: string;
    alumno_tienehermanos: any;
    alumno_grados: string;
    alumno_nombrepadre: string;
    alumno_apellidopadre: string;
    alumno_profesionpadre: string;
    alumno_telefonopadre: string;
    alumno_nombremadre: string;
    alumno_apellidomadre: string;
    alumno_profesionmadre: string;
    alumno_telefonomadre: string;
    alumno_direc: string;
    depto_id: any;
    muni_id: any;
    alumno_telefono: string;
    fecha_nacimiento: string;
    imagen: string;
    usu_id: any;
    codigo_activacion: string;
    alumno_pfexalumno: any;


    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }

}