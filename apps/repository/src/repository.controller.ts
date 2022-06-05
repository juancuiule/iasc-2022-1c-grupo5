import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller()
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  getHello(): string {
    return this.repositoryService.getHello();
  }
}
