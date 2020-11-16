import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto
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
        type        : Boolean,
        description : 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type        : [String],
        description : 'permissionIds [input here api field description]',
    })
    permissionIds: string[];

    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
    })
    accountIds: string[];

}