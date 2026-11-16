export const  validar_maxpoint = (element,curso) =>{

    var inicial = element.title.toString().substring(0, 1);
    var grado = parseInt(curso.nombre.substring(0,2));

    if(grado>=1 && grado <10){
      switch (inicial) {
        case 'C':
  
          if (element.maxpoints == 15 || element.maxpoints == 10) {
            return true
          }
  
          return false;
  
        case 'T':
  
          if (element.maxpoints == 10 || element.maxpoints == 15 || element.maxpoints == 5) {
            return true
          }
  
          return false;
  
        case 'P':
  
          if (element.maxpoints >= 0) {
            return true
          }
          return false;

          case 'E':
  
          if (element.maxpoints >= 0) {
            return true
          }
          return false;
  
        default:
          return false;
      }
    }else if(grado>9 ){

      switch (inicial) {
        case 'C':
  
          if (element.maxpoints == 10 || element.maxpoints == 15) {
            return true
          }
  
          return false;
  
        case 'T':
  
          if (element.maxpoints == 10 || element.maxpoints == 15 || element.maxpoints == 5) {
            return true
          }
  
          return false;
  
        case 'P':
  
          if (element.maxpoints >= 0) {
            return true
          }
          return false;

          case 'E':
  
          if (element.maxpoints >= 0) {
            return true
          }
          return false;
  
        default:
          return false;
      }

    }


 

  }