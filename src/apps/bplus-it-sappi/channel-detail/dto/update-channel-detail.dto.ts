import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc46ba40-8746-4735-9f39-e0322bf00392'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd9481fd0-b445-4a6b-a3c3-1a426349f042'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'brtr8oy53rx4xqs3khuma8dqvcawnx3h7y68t6bfaruio3yt8z'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b43908ab-f52f-428e-b7d6-ee1b805bf069'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gwds7e52gcnz22dugl43'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '60baa61e-ca17-4a2f-90d8-6bd2adcd466e'
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
        example     : '2020-07-29 15:29:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 10:35:36'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 07:40:05'
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
        example     : '294wu59hdy4ro04e6r0vqx6ndyl0nudba2n3lwcx'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'ckc0fz88hboeg3zfsjyqkm95qpj6in1zqwdp1tivpqfuegumfc'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '6ol8kt342lns2ovwc7114anvjudrbd6osro8l7yaseb06dkwvclli4fvxhhm4r587dn0ksmkonk522mbfsk6wz19xt3vm6mvdcphp3n6noqkss19ohyp828zz64k4rag2oonnaerqbw8nc51evblfdk6pdg0mv09'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '6s08smf6zv3awz4si0daq224q3fty11964qpbo72pafvq40v04faemuzym6a885hngic2h37zp037ydwixdzad5ens0u0g4aoul1pwarz2jmsmtesydr21mxncipiur74awwj8nmdtlbi8wzegqv64wp9rb0avhb'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'n0mg3f9x42v5534qs6bguk74dxzbg771jhecepb2xsm5ioh3zlt3glxdbaarnaaadkoph29tj4out4h9lswggc10se7zf0m08rxp2lpiyivc118yqwepjdnogrh6yo8kjcg3882ymcj5x0m3cwpck7ejcj15qj0u'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sunt natus eveniet earum et ex neque aut voluptatem. Nisi qui est. Sit unde eaque ipsum illum magnam. Consequatur sed incidunt. Sed laborum aliquam nihil sapiente pariatur.'
    })
    detail: string;
    
    
}
