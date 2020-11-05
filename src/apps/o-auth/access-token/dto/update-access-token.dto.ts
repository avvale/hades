import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
    })
    clientId: string;

    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
    })
    accountId: string;

    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
    })
    token: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
    })
    isRevoked: boolean;

    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
    })
    expiresAt: string;

}