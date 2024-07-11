import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NamesService } from './names.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/names')
@ApiTags('names')
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Post()
  @ApiBody({
    description: 'Añadiendo un nombre',
    examples: {
      example1: {
        value: {
          name: 'Pepe',
        },
      },
      example2: {
        value: {
          name: 'Pupa',
        },
      },
    },
  })
  @ApiOperation({
    description: 'crea un nuevo usuario en la base de nombres',
  })
  createName(@Body() data: { name: string }) {
    return this.namesService.createName(data.name);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    type: 'string',
    required: false,
    description: 'Nombre por el que empieza el Query',
  })
  @ApiOperation({
    description:
      'devuelve todos los nombres o busca uno que exista en la base de datos',
  })
  getName(@Query('start') start: string) {
    return this.namesService.getName(start);
  }

  @Put('/:name/:newName')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Nombre Original',
  })
  @ApiParam({
    name: 'newName',
    type: 'string',
    description: 'Nombre Para remplazar al Original',
  })
  @ApiOperation({
    description:
      'recibe el primer parametro y lo busca en la base de datos para saber si existe y lo actualiza con el segundo parametro',
  })
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.namesService.updateName(name, newName);
  }
  @Delete('clear')
  @ApiOperation({
    description: 'limpia todos los nombres de la base de nombres',
  })
  clearAllName() {
    return this.namesService.clearAllNames();
  }

  @Delete('/:name')
  @ApiOperation({
    description: 'busca el primer parametro en la base de datos y lo elimina ',
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Nombre a eliminar',
  })
  deleteName(@Param('name') name: string) {
    return this.namesService.deleteName(name);
  }
}
