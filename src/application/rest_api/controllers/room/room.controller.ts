import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Room } from 'src/domain/rooms/room/room';
import { RoomRepository } from 'src/infrastructure/data_access/gremlin/repositories/room.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CreateRoomDto } from './dtos/create-room.dto';
import { AllRoomDto } from './dtos/get-all-room.dto';
import { RoomDto } from './dtos/room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomRepo: RoomRepository) {}

  @Serialize(AllRoomDto)
  @Get('/all')
  async getAllFloors() {
    const floors = await this.roomRepo.getAllRooms();
    return floors;
  }

  @Serialize(RoomDto)
  @Post()
  async createFloor(@Body() body: CreateRoomDto) {
    const room = Room.create(body);
    const result = await this.roomRepo.createRoom(room, body.floorId);
    return result;
  }

  @Serialize(RoomDto)
  @Get('/:id')
  async getBuilding(@Param('id') id: string) {
    return this.roomRepo.getRoom(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.roomRepo.deleteRoom(id);
  }
}
