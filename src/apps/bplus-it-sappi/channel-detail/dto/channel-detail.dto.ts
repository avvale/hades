import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd44fac03-2236-4492-9511-576fe4024c39'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8432aec6-22c2-49a2-a5ce-987bb6221ca4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'akjoqgy9e6ppufla7vd12r7ra1d18syrp8znj0xk5ebxumbdg4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51c31370-5ea2-4417-836c-5841d6811822'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iqt7fv5forj5iq4lpbsi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c'
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
        example     : '2020-07-29 00:28:46'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 12:13:57'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 22:18:08'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'saqa4kutduorje7nc70kvv44updmet3slht2u7m8'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'yuvm6pk6n6gia95e93849n4gf8ewypb1wgs8hknrurh9y22ypm'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '2zpzbyh9b8qu1pk762xv6igyn8b0yi9ygvw55bsw7tz1qm38m8knw8d8fe1gdvrxj54wyxf7tfznrod37c1p66htgzvqdqyfesesf6c7mkwhmh7nojyzm4982vcg8lsp9sqhfx78gikl3i78l327ptkay01ie2hg'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'miwix88wc88bwm4m70e8k819zajyco56qe9n133xlvl3akirv2ghgor39d5q3tw3b1nixs72fuu0wf1p6wlbxb3dwhe16hiyet7n6yg5on1p8ehb3itt81zxodxkozs9wfz691ka5bmpggjvdyzfpp080a0u66l4'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'o63u8pyzcr91r7el33neoea48hjtla1o58i86d7ecld9uo4e28srx927623izydsvleqnfqo7fmcnf1npomcbhrdr6cewo74b9wbru3pk9zt9xfa6sz7fgif0vc0mbjfmme5jyk43e1wmbv7r9vt4lj6kubih7br'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ipsam id est autem repellat. Possimus et aut dolores et. Sed a ut eius nesciunt dolorum perspiciatis. Sunt veritatis animi. Iure est vel explicabo aut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 05:46:54'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 03:49:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 15:16:51'
    })
    deletedAt: string;
    
    
}
