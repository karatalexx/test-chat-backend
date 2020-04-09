import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { TokenService } from '../token/token.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { DB } from '../../database';
import { TDecoded } from '../token/token.service.types';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { ChatMessageRepository } from '../../repositories/chat-message/chat-message.repository';

export class ChatService {
  protected io: any;
  protected chatMessageService: ChatMessageService;
  protected chatMessageRepository: ChatMessageRepository;
  protected connectedUsers: any[] = [];

  constructor(io: any) {
    this.io = io;
    this.chatMessageService = new ChatMessageService();
    this.chatMessageRepository = new ChatMessageRepository();
  }

  async main() {
    this.io.set('transports', ['websocket']);
    this.io
      .use(async (socket: any, next: any) => {
        if (socket.handshake.query && socket.handshake.query.token) {
          // Decode JWT token
          const decoded = new TokenService().verify(socket.handshake.query.token, process.env.JWT_SECRET);

          // Find user by decoded token
          const userRepository = new UserRepository(DB.getInstance().getConnection());
          const user = await userRepository.findByToken((decoded as TDecoded).user_token);
          if (!user) return next(new UnauthorizedException());
          this.connectedUsers.push(user);
          socket.user = user;

          next();
        } else {
          next(new UnauthorizedException());
        }
      })
      // User connected
      .on('connection', async (socket: any) => {
        // Total users in chat
        this.io.sockets.emit('getCount', this.io.engine.clientsCount);

        // Users list
        socket.emit('users_list', this.connectedUsers);

        // User connected
        this.io.sockets.emit('user_connected', [socket.user]);

        // List of chat messages
        this.io.sockets.emit('messages_list', await this.chatMessageRepository.getLast(24));

        // User typing
        socket.on('user_typing', async (userId: number) => {
          this.io.sockets.emit('user_with_id_typing', userId);
        });

        // User send new message
        socket.on('send_new_message', async (text: string) => {
          // Save message in database
          const newMessage = await this.chatMessageService.store({
            user_id: socket.user.id,
            text
          });
          const message = await this.chatMessageRepository.findById(newMessage.id);
          this.io.sockets.emit('has_new_message', [message]);
        });

        // User disconnected
        socket.on('disconnect', () => {
          this.io.sockets.emit('user_disconnected', socket.user);
          this.connectedUsers = this.connectedUsers.filter(user => user.id !== socket.user.id);
        });
      });
  }
}
