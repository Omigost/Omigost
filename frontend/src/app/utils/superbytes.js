/*
 * superbytes
 * https://github.com/damianpolak/superbytes
 *
 * Copyright 2018, Damian Polak
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 */

// Usage: superbytes(bytes, arg1, arg2)
// bytes : number value in bytes
// arg1 : SI metric system or traditional (true or false, default is false traditional 1024^n)
// arg2 : decimal number after point (default is 2)
// You can use arg1 and arg2 interchangeably

module.exports = (bytes, arg1, arg2) => {
   'use strict';

   const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   bytes = Math.abs(bytes);
   let divider,
       si,
       digits = 0;

   if((arg1 === undefined) && (arg2 === undefined)) {
     divider = 1024;
     digits = 2;
   }
   if(typeof arg1 === 'boolean') {
     if(arg1) {
       divider = 1000;
     } else {
       divider = 1024;
     }
     if(typeof arg2 === 'number') {
       digits = arg2;
     } else {
       digits = 2;
     }
   } else if(typeof arg1 === 'number') {
     digits = arg1;
     if(typeof arg2 === 'boolean') {
       if(arg2) {
         divider = 1000;
       } else {
         divider = 1024;
       }
     } else {
       divider = 1024;
     }
   }

   if(Number.isFinite(bytes)) {
     if(bytes < divider) {
       let num = bytes;
       return `${num} ${UNITS[0]}`;
     }

     for(let i = 1; i <= 8; i++) {
       if(bytes >= Math.pow(divider, i) && bytes < Math.pow(divider, i+1)) {
         let num = (bytes/Math.pow(divider, i)).toFixed(digits);
         return `${num} ${UNITS[i]}`;
       }
     }
   }
 };
