const {io}= require('../index');
const Band = require ('../models/band')
const Bands = require ('../models/bands')

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroe del Silezio'));


console.log(bands);


//Messaggi de Sockets
io.on('connection', client => {
    console.log('cliente connesso');
    
    client.emit('active-bands', bands.getBands() )


    client.on('disconnect', () => { 
        console.log('client disconnected');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', {admin: 'Nuovo messaggio'});
      });

    

    client.on('nuovo-messaggio', ( payload ) => {
        io.emit('nuovo-messaggio', payload );
      });

      client.on('vote-band', ( payload ) => {
        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands() )
    });


    // Escuchar evento 'add-band' 

    client.on('add-band', ( payload ) => {

        const newBand = new Band(payload.name);
        bands.addBand(newBand)
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands() )
    });





    });


   
    


