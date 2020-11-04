import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto
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
        description : 'version [input here api field description]',
    })
    version: string;

    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
    })
    scenario: string;

    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
    })
    party: string;

    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
    })
    receiverParty: string;

    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
    })
    component: string;

    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
    })
    receiverComponent: string;

    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
    })
    interfaceName: string;

    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
    })
    interfaceNamespace: string;

    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
    })
    iflowName: string;

    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
    })
    responsibleUserAccount: string;

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
        description : 'folderPath [input here api field description]',
    })
    folderPath: string;

    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
    })
    description: string;

    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
    })
    application: string;

    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
    })
    isCritical: boolean;

    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
    })
    isComplex: boolean;

    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
    })
    fieldGroupId: string;

    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
    })
    data: any;

}