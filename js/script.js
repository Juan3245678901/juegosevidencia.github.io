const COLUMNAS = 4;
const SEGUNDOS_ESPERA_VOLTEAR_IMAGEN = 1;
const NOMBRE_IMAGEN_OCULTA = "./img/signo.jpg";






new Vue({
  el: "#app",
  data: () => ({
    imagenes: [
      "./img/cabra.jpg",
      "./img/conejo.jpg",
      "./img/leon.jpg",
      "./img/oveja.jpg",
      "./img/perro.jpg",
      "./img/gato.jpg",
    ],
    memorama: [],
    ultimasCoordenadas: {
      indiceFila: null,
      indiceImagen: null,
    },
    NOMBRE_IMAGEN_OCULTA: NOMBRE_IMAGEN_OCULTA,
    
    aciertos: 0,
    esperandoTimeout: false,
    puntajeJugador1: 0,
    puntajeJugador2: 0,
    turnoJugador: 1,
    Njugador: null,
  }),

  methods: {
    
   
    indicaciones() {
      Swal.fire({
              title: "Reglas",
              html: `
          <p class="R1"> 1: cuando aciertas un par tienes un nuevo intento </p>
          <p class="R1"> 2: al inicio  del juego el turno es del jugador 1 </p>
          <p class="R1"> 3: gana el que tenga mas aciertos </p>
          <p class="h4">no pos amonos</p>`,
              confirmButtonText: "empecemos la aventura",
              allowOutsideClick: false,
              allowEscapeKey: false,
              
          })
          .then(this.precargarImagenes)
    },
    

        indicarEmpate() {
            Swal.fire({
                    title: "Empate",
                    html: `
                <img class="img-fluid" src="./img/cagaste.jpg" alt="perdieron">
                <p class="h4">no pos amonos</p>`,
                    confirmButtonText: "Jugar de nuevo",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                .then(this.reiniciarJuegoConPuntaje)
                
        },
        
      
        indicarVictoriaj1() {
            Swal.fire({
                    class: "ganador1",
                    title: "¡Ganaste jugador1!",
                    html: `
                <img class="img-fluid" src="./img/ganaste_esta_vez.jpg" alt="Ganaste">
                <p class="h4">¡En hora buena¡ </p>`,
                    confirmButtonText: "Jugar de nuevo",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                .then(this.reiniciarJuegoConPuntaje)
        },
        indicarVictoriaj2() {
            Swal.fire({
                    title: "¡Ganaste jugador2!",
                    html: `
                <img class="img-fluid" src="./img/ganaste_esta_vez.jpg" alt="Ganaste">
                <p class="h4">¡En hora buena¡ </p>`,
                    confirmButtonText: "Jugar de nuevo",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                .then(this.reiniciarJuegoConPuntaje)
        },
        
    cambiarTurno() {
      
      this.turnoJugador = this.turnoJugador === 1 ? 2 : 1;
      if (this.turnoJugador === 1){
        this.Njugador = "Jugador 1";
      }
      else if (this.turnoJugador === 2){
        this.Njugador = "Jugador 2";
      }
    },

    marcarJugador(jugador) {
      if (jugador === 1) {
        this.JUGADOR1 = true;
        this.JUGADOR2 = false;
        
        
      } else if (jugador === 2) {
        this.JUGADOR1 = false;
        this.JUGADOR2 = true;
       
      }
      this.turnoJugador = jugador;
    },

    haGanado() {
      return this.memorama.every((arreglo) => arreglo.every((imagen) => imagen.acertada));
    },

    mezclarArreglo(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },

    

    aumentarPuntajeJugador() {
      if (this.turnoJugador === 1) {
        this.puntajeJugador1++;
      } else if (this.turnoJugador === 2) {
        this.puntajeJugador2++;
      }
    },

    voltear(indiceFila, indiceImagen) {
      if (this.esperandoTimeout) {
        return;
      }
      if (this.memorama[indiceFila][indiceImagen].acertada) {
        return;
      }
      if (this.ultimasCoordenadas.indiceFila === null && this.ultimasCoordenadas.indiceImagen === null) {
        this.memorama[indiceFila][indiceImagen].mostrar = true;
        this.ultimasCoordenadas.indiceFila = indiceFila;
        this.ultimasCoordenadas.indiceImagen = indiceImagen;
        return;
      }
      let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
      let ultimaImagenSeleccionada = this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen];
      if (indiceFila === this.ultimasCoordenadas.indiceFila && indiceImagen === this.ultimasCoordenadas.indiceImagen) {
        this.memorama[indiceFila][indiceImagen].mostrar = false;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        
        return;
      }
      this.memorama[indiceFila][indiceImagen].mostrar = true;
      if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
        this.aciertos++;
        this.memorama[indiceFila][indiceImagen].acertada = true;
        this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].acertada = true;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        if (this.haGanado()) {
          this.mostrarResultado();
        }
        this.aumentarPuntajeJugador();
      } else {
        this.esperandoTimeout = true;
        setTimeout(() => {
          this.memorama[indiceFila][indiceImagen].mostrar = false;
          this.memorama[indiceFila][indiceImagen].animacion = false;
          this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].mostrar = false;
          this.ultimasCoordenadas.indiceFila = null;
          this.ultimasCoordenadas.indiceImagen = null;
          this.esperandoTimeout = false;
          this.cambiarTurno();
        }, SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
       
      }
    },

    mostrarResultado() {
      let mensaje;
      if (this.puntajeJugador1 > this.puntajeJugador2) {
       this.indicarVictoriaj1();
      } else if (this.puntajeJugador1 < this.puntajeJugador2) {
        this.indicarVictoriaj2();
      } else if (this.puntajeJugador1 == this.puntajeJugador2){
        this.indicarEmpate();
      }
      
      
    },

    reiniciarJuego() {
      let memorama = [];
      this.imagenes.forEach((imagen, ) => {
        let imagenDeMemorama = {
          ruta: imagen,
          mostrar: false,
          acertada: false,
     
        };
        memorama.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
      });
      this.mezclarArreglo(memorama);
      let memoramaDividido = [];
      for (let i = 0; i < memorama.length; i += COLUMNAS) {
        memoramaDividido.push(memorama.slice(i, i + COLUMNAS));
      }
      this.intentos = undefined;
      this.turnoJugador = 1;
      this.memorama = memoramaDividido;
    },

    reiniciarJuegoConPuntaje() {
      this.reiniciarJuego();
      this.puntajeJugador1 = 0;
      this.puntajeJugador2 = 0;
      this.aciertos = 0;
      this.Njugador = "jugador 1";
      
    },

    precargarImagenes() {
      Swal.fire({
        title: "Cargando",
        html: `Cargando imágenes...`,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(this.reiniciarJuegoConPuntaje);
      Swal.showLoading();
      let total = this.imagenes.length,
        contador = 0;
      let imagenesPrecarga = Array.from(this.imagenes);
      imagenesPrecarga.push(NOMBRE_IMAGEN_OCULTA);
      imagenesPrecarga.forEach((ruta) => {
        const imagen = document.createElement("img");
        imagen.src = ruta;
        imagen.addEventListener("load", () => {
          contador++;
          if (contador >= total) {
            this.reiniciarJuego();
            Swal.close();
          }
        });
        document.body.appendChild(imagen);
        document.body.removeChild(imagen);
      });
    },
  },

  mounted() {
    this.indicaciones();
     },
});

