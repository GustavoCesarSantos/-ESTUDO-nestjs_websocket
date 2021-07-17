import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RoutesGateway } from './routes.gateway';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, RoutesGateway],
})
export class RoutesModule {}
