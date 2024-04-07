const {io}= require('../index');

//Messaggi de Sockets
io.on('connection', client => {
    console.log('cliente connesso');
    client.on('disconnect', () => { 
        console.log('client disconnected');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
      });

      io.emit('mensaje', {admin: 'Nuovo messaggio'});
      
  });


