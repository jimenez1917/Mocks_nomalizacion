import express from 'express';
import { schema } from "normalizr";
import productosRouter from './routes/routes.js';
import { Server } from 'socket.io';


const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => console.log((`Listening on PORT ${PORT}`)));

const io = new Server(server);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


app.use('/api',productosRouter);

io.on('connection', (socket) => {
    socket.on('newMessage', (data) => {
        io.emit('refreshChat',data);
    })
    socket.on('newProduct', (data) =>{
        io.emit('refreshProducts',data);
    })
})