import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c94549ab-979a-46c3-9ef1-e32329a8568b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'f8m5tb0ymhkm1caumvjtxr232nlj8t38nhrgopzx3054cevcsb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ca623564-86d5-4ba6-95f7-898ee1649c1f'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'f4m5q7a318q9c1bb7zxj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8'
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
        example     : '2020-07-28 21:35:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 21:25:26'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:29:33'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'ts9ry0855ma5mp8cdagfxj4yvtneadn71mip17b3'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'w8rowcmtka7dxjzezwax99q66h5swecizgtz60e9dxhknb5qrk'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3iwizgcgki9axaj26e3k038cp69psqan74ism9lvwg9u0ap5cho0qfpl0okigumhsoazzsrqfobvi4cvj2pfb8n66eqhr96yfgs9eojxddm7hetem8bfe28d2ixuz6khco526i1pa8yhhcksmwgzo3eh86fsvpp8'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'nh71tevkdcai2zme3ry0elkf0ffsbgq10300y7k363xs1gpluwxr03rrv2ah53tlgnumjiengebnm2m6687azmuf7hn568xpvs6p6kjks2cp5edlelt5anxfx9x7bvlq4ge9oop8pq0tasx4cukhwdw5i7ol47me'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'l3ts4k0svybek60o303hdbyn4sxnlo71611nc7xmkcwpl3qz5o0jfze37w7q8zjlpah9y4ptga21kqhsm88jattltzux8rw6mgutjic2grtxlvdw7xr2dv4n3hhawwch7krqir3e2w1096tfnvbm52crzrwwb6s8'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quasi iste sint. Nihil dolores sed dolores ut est exercitationem sunt aut nobis. Reprehenderit et provident molestias quaerat quidem nulla hic ut fugiat. Commodi quia recusandae sit laudantium facilis error. Voluptas cum est consequatur fugiat molestiae consequuntur. Pariatur qui dolor.'
    })
    detail: string;
    
    
}
