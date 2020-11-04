import { ApiProperty } from '@nestjs/swagger';

export class SystemDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '12e6fe4f-d59e-4588-add9-cb553ba2b8d3',
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
        description : 'version [input here api field description]',
    })
    version: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
    })
    environment: string;

    @ApiProperty({
        type        : String,
        enum        : ['WSO2','SAPPI','B2B','MULESOFT','SAPSCI'],
        description : 'technology [input here api field description]',
        example     : 'SAPPI',
    })
    technology: string;

    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
    })
    isActive: boolean;

    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
    })
    cancelledAt: string;

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