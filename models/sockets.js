const MarkerList = require("./markerList");

class Sockets {

  constructor( io ) {
    this.io = io

    //crear una instancia de nuestros marcadores
    this.markerList = new MarkerList()

    this.socketEvents()
  }

  socketEvents() {
    //On connection
    this.io.on('connection', ( socket ) => {
      console.log('Cliente conectado');
      //TODO: marcadores activos
      socket.emit('active-markers', this.markerList.active )

      //TODO: marcador nuevo
      socket.on('new-marker', marker => {
        this.markerList.addMarker( marker )
        socket.broadcast.emit('new-marker', marker)
      })

      //TODO: marcador actualizado
      socket.on('updated-marker', marker => {
        this.markerList.updateMarker( marker )
        socket.broadcast.emit('updated-marker', marker)
      })

    })
  }

}

module.exports = Sockets;