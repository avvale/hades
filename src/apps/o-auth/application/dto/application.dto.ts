import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from './../../../o-auth/client/dto/client.dto';

export class ApplicationDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
    })
    secret: string;

    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type        : [ClientDto],
        description : 'clientIds [input here api field description]',
    })
    clients: ClientDto[];

    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
    })
    createdAt: string;

    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
    })
    updatedAt: string;

    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
    })
    deletedAt: string;

}