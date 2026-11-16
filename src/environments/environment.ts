// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: "http://localhost:50000/api/v1/",
  //server: "http://34.138.40.177:5000/api/v1/",
  //reportes:"http://localhost:4800",
  reportes:"http://34.138.40.177:4800",
  //archivos:"http://localhost:3500/"
  archivos:"http://34.138.40.177:3500/",
  ip_server:"34.138.40.177"

  /*server: "http://34.69.167.222:3000/api/v1/",
  reportes:"http://34.69.167.222:4800",
  archivos:"http://34.69.167.222:3500/"*/
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
