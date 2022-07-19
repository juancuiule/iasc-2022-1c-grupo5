import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { RepositoryService } from './repository.service';
import { Cron, Interval } from '@nestjs/schedule';

@Controller()
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  getHello() {
    const { bids, buyers } = this.repositoryService;
    return { bids, buyers };
  }

  @MessagePattern({ cmd: 'create_buyer' })
  async createBuyer(dto) {
    return await this.repositoryService.createBuyer(dto.buyer);
  }

  @MessagePattern({ cmd: 'get_bids_by_tag' })
  async getBidsByTag(@Payload() dto) {
    return await this.repositoryService.getBidsByTags(dto.tags);
  }

  @MessagePattern({ cmd: 'create_bid' })
  async createBid(@Payload() dto) {
    return await this.repositoryService.createBid(dto.bid);
  }

  @MessagePattern({ cmd: 'cancel_bid' })
  async cancelBid(@Payload() dto) {
    return await this.repositoryService.cancelBid(dto.id);
  }

  @MessagePattern({ cmd: 'register_offer' })
  async registerOffer(@Payload() dto) {
    return await this.repositoryService.registerOffer(dto.id, dto.offer);
  }

  @EventPattern('event')
  async hello(data: string) {
    console.log(`Data from bids service: ${data}`);
    return;
  }
  @Interval(60000)
  async handleCron() {
    console.log('Called when the current minute is 1');
    return await this.repositoryService.endBidExpired();
    //await this.repositoryService.endBidsExpired();
  }
}
