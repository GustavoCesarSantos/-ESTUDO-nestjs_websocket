import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RoutesGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  //Para capturar o id do cliente que se conectar.
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    console.log('Payload vindo do client', payload);

    client.emit('receive-message', 'mensagem recebida');

    //Envia uma mensagem para um cliente expecifico
    //this.server.sockets.connected[client.id].emit(payload);

    //Envia uma mensagem para todos os participantes da sala, menos para o cliente que enviou a mensagem
    client.broadcast.emit('receive-message', payload);
  }
}
