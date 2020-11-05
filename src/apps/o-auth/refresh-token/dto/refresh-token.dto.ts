import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : [AccessTokenDto],
        description : 'accessTokenId [input here api field description]',
        example     : '',
    })
    accessTokenId: AccessTokenDto[];

    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
    })
    token: string;

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