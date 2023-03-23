const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/database');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.modsPath = '/api/mods';
        this.warframePath = '/api/warframe';
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        this.app.use( '/', require('../routes/server'));
        this.app.use( this.modsPath, require('../routes/mods'));
        this.app.use( this.warframePath, require('../routes/warframe'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
