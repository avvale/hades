import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e69bc319-5758-430f-bf39-1b56a867a12a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2tbj79vpuc9hx1sku1u3air019f9ocgh18yrv3yrkxvssk0ew9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '856c8fb7-d652-42ed-913b-6fc419c5dd58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'tegl9zfpbtkdb0zyj3it'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1c2fc88e-5b8a-4001-af0a-c998e76bee0d'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-23 14:44:19'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 08:37:20'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 00:55:53'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '1fc7e637-dadf-49ed-962f-25f7c02c9687'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'vdqfwj858lfkncryl628412iminczi8nz5jglivyte6rs4f1no'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'mmab0yitth16t1hyleg0kls9mjy8toaz5wznjtqrrjuuqr48mfcb465t4v2epwft6jlrj41q06elcc340wz3kv69gaa4u69musb2vym0ltjkjrh9c2to3cck0gyk7wi93a0giqx88kpmoflno4odw367wa3egabh'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'eafxa1z13coil64251lc0gdg994jcto03k5ympz64a5pe9rtpb1lej8brtw6gr5b6e88kzao3ri0wcdyt0c2nys7b8etx1zsy7w2gdgr3vle9809j9u88e8nuefq8wccwmohvq8x5uc2ecgiujvqrbk6e4kifoyi'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'v8so2sgy6l8rmogq4wu0fqgm5upcq4b5oq08s9ldosiz6tqxar251m0416i1zy11r3io5beuhqwsk3mie47erkudr5aihtb5hz79x20443cap63r1rm6r488vpr5rafqbgzpfezqiiocboc2qglcakkvicqiqf8r'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Minus asperiores aut ducimus delectus et error animi eius. Non ut modi ex corporis. Et in excepturi perferendis consequuntur omnis qui id quibusdam. Rem at ex praesentium autem accusamus. Natus minus doloremque ipsum doloremque sed consectetur ullam. Harum et libero a quis.'
    })
    detail: string;
    
    
}
