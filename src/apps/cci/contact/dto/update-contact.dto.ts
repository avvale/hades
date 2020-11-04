import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
    })
    tenantId: string;

    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
    })
    tenantCode: string;

    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
    })
    systemId: string;

    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
    })
    systemName: string;

    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
    })
    roleId: string;

    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
    })
    roleName: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
    })
    surname: string;

    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
    })
    email: string;

    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
    })
    mobile: string;

    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
    })
    area: string;

    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
    })
    hasConsentEmail: boolean;

    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
    })
    hasConsentMobile: boolean;

    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
    })
    isActive: boolean;

}