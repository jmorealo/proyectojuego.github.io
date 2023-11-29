document.addEventListener("DOMContentLoaded", function() {
    cargarJuego();
  }); 
  
  var palabraSeleccionada;
  var letrasusadas = []; //Introduzco un array donde se introducen las letras usadas
  
  function cargarJuego(){
        //Nos aseguramos que el usuario introduzca al menos una letra, hasta que lo haga no saldrá del bucle do / while
      do{
      palabraSeleccionada = prompt("Elige una palabra para adivinarla y pulsa aceptar");
      palabraSeleccionada = palabraSeleccionada.toLowerCase().replace(/[^a-z]/g, '');

     }while( !palabraSeleccionada || palabraSeleccionada.length < 1);
        
      
      var guiones = "_".repeat(palabraSeleccionada.length);
      var intentos = 3;
      var longitudpalabra = palabraSeleccionada.length;
      var letrasquedan = guiones.length;
     
      //Estas variables son las que uso en el HTML
      document.getElementById("palabra").innerHTML = guiones;
      document.getElementById("numIntentos").innerHTML = intentos;
      document.getElementById("longitudpalabra").innerHTML = longitudpalabra;
  
      document.getElementById("inputLetra").value = "";
  
      document.getElementById("victoria").style.display = "none";
      document.getElementById("derrota").style.display = "none";
    
      letrasusadas = []; //elimino las letras usadas del juego anterior
   
  }
  
  
  function verificarLetra(){
      var letra = document.getElementById("inputLetra").value.toLowerCase(); // Busco que lo que introduzca el usuario sea una letra minuscula, sino no loes la transformo. 
      if (letra.length !== 1 || !/[a-z]/.test(letra)){  //Si no es una letra, da el aviso y no contabiliza el intento
          alert("Solo se acepta letras y 1 a la vez.");
          return;
      }

      if (letrasusadas.includes(letra)){  //Avisa al usuario de que ya ha introducido esa letra
       
        alert ("Ya has usado esta letra, prueba con otra");
        return;

      }

      letrasusadas.push(letra) //agrega la letra al array
  
      

      if(palabraSeleccionada.includes(letra)){
          actualizarPalabra(letra);
  
          var longitudpalabra = parseInt(document.getElementById("longitudpalabra").innerHTML);
          longitudpalabra--;
          document.getElementById("longitudpalabra").innerHTML =longitudpalabra;
  
          if (!document.getElementById("palabra").innerHTML.includes("_")) {
              document.getElementById("victoria").style.display = "block";
  
              setTimeout (function(){cargarJuego();},2500);  //Meto un retardo de 2,5 segundos entre que sale la imagen victoria y vuelve a cargar el juego.
          }
      } else{
          var intentos = parseInt(document.getElementById("numIntentos").innerHTML); //Si falla resta 1 intento
          intentos--;
          document.getElementById("numIntentos").innerHTML = intentos;
      } 
  
  
      if(intentos === 0 ){
              document.getElementById("derrota").style.display = "block";
  
              setTimeout (function(){alert("Has perdido! La palabra era: " + palabraSeleccionada);},1250); 
  
              setTimeout (function(){cargarJuego();},1250);  
  
          }
     
  
   document.getElementById("inputLetra").value = "";
      
  }
  
  function actualizarPalabra(letra){
      var palabraActual = document.getElementById("palabra").innerHTML;
      var nuevaPalabra = "";
  
      for (var i = 0; i < palabraSeleccionada.length; i++){
          if (palabraSeleccionada[i] === letra) {
              nuevaPalabra += letra;    
          } else {
              nuevaPalabra += palabraActual[i];
          }
      }
      document.getElementById("palabra").innerHTML = nuevaPalabra;
  }