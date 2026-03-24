import { Controller, Get, HttpCode, HttpStatus, Redirect, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {

  @ApiExcludeEndpoint()
  @Get()
  @Redirect('swagger',HttpStatus.FOUND)
  getSwagger(){
    return {};
  }
}
