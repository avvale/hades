import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
    })
    hash: string;

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
        description : 'party [input here api field description]',
    })
    party: string;

    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
    })
    component: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

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
        description : 'adapterType [input here api field description]',
    })
    adapterType: string;

    @ApiProperty({
        type        : String,
        enum        : ['SENDER','RECEIVER'],
        description : 'direction [input here api field description]',
    })
    direction: string;

    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
    })
    transportProtocol: string;

    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
    })
    messageProtocol: string;

    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
    })
    adapterEngineName: string;

    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
    })
    url: string;

    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
    })
    username: string;

    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
    })
    remoteHost: string;

    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
    })
    remotePort: number;

    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
    })
    directory: string;

    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
    })
    fileSchema: string;

    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
    })
    proxyHost: string;

    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
    })
    proxyPort: number;

    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
    })
    destination: string;

    @ApiProperty({
        type        : String,
        enum        : ['ACTIVE','INACTIVE'],
        description : 'adapterStatus [input here api field description]',
    })
    adapterStatus: string;

    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
    })
    softwareComponentName: string;

    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
    })
    responsibleUserAccountName: string;

    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
    })
    lastChangeUserAccount: string;

    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
    })
    lastChangedAt: string;

    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
    })
    riInterfaceName: string;

    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
    })
    riInterfaceNamespace: string;

}