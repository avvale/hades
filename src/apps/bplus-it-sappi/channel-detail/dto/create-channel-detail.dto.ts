import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8a31e12b-018d-43e9-8d58-8746bae6b01a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n7xek9k2s6art67atvgfdfhc4fmopufmve89a5z5pfe2xhe0ix'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '484039ed-36fe-48ad-9862-3ee3a36c0f04'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'af41kn4yzoo2oa3r1uja'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '656afb0e-aeb8-4710-905d-df224440e09a'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-29 15:59:20'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 10:42:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 01:49:50'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNKNOWN',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '2ss3p84ohm6ja3pb2102dgxmli6zt8d60z6yd1kc'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'djifqgns5t71ycwl1feyz4433866k12ieh4py3lm410r3qe7yy'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '9d06in2idywvkxjm7dqk8ki3wxtxsp8la1swfgxbkrdoww32t1q9y4nphrg5qxewn1htyvtp0bee5q8r6nj9dhd2kkwcwqi8xo7ztza8vabfgxpewxq0tbjrtij7fao5mhmcq9mrj88sii7eeeelo3hu98prr7fh'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'qfdxi02bf7yw6tj6meqfgnenugyllpdertiqo05sfi9wa1ngxm9qi1f5r9225xty5p6act0696ufss2l1pa6ibz729imepa7ljmedws9pigvwlj8oq6l9g6412g9g42vz344ka5rhx0wx41an7ds2ttue2v5rcee'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'vl05g2qenrxxlmkqnt5jke2a5zglsbelpwajif1toyxtyfxi3kxjlknqis3ijer2a0exa1z8tw34q71bo0xeomfutu7imtiaku04v61mlq2xtc7plm6wiebbkik3fcptwnn3zwopv78th537r6aasip341d7fqp1'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quos et quis iusto voluptatem optio perferendis quia. Exercitationem harum id. Cupiditate sit voluptatum hic.'
    })
    detail: string;
    
    
}
