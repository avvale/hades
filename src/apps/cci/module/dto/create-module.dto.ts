import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto
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
        description : 'channelHash [input here api field description]',
    })
    channelHash: string;

    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
    })
    channelParty: string;

    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
    })
    channelComponent: string;

    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
    })
    channelName: string;

    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
    })
    flowHash: string;

    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
    })
    flowParty: string;

    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
    })
    flowReceiverParty: string;

    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
    })
    flowComponent: string;

    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
    })
    flowReceiverComponent: string;

    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
    })
    flowInterfaceName: string;

    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
    })
    flowInterfaceNamespace: string;

    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
    })
    version: string;

    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
    })
    parameterGroup: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
    })
    parameterName: string;

    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
    })
    parameterValue: string;

}