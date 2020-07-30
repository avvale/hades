import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '502a5f46-8674-49ff-9c7c-9c608bc06786'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '33b3b361-a914-4658-bc9e-d141522a506b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e0w4mx0bo4v3y7661kfh3fbuqe63xuzoaw5icfv0ry7i9gxzjk'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'de86c386-6677-4382-b18f-7bedb33a7b09'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kbx51drvs0mt5l435f1l'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '97409111-8a55-4be9-a414-e586b1b3b3c0'
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
        example     : '2020-07-29 21:07:01'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 03:54:14'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 13:54:04'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'woet9m7w3c3mmzk63n6p8o6lpsyua3n8ksldxkx1'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '00555slmcm8psj5r0hbl7c8uepptuobof6xzkcr55jokn5k8wh'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'yyxhk8lvfz6iyrujvmupcwa7u8o88bd5m8ehbnc9u7exgiqm602baymap8v1h37gt70pfn87q3hvmt4o16znbpzv2r7fymp0gf38o4bf2zsa6867d9e3wmflw6zwml1eh9qvsdeq6nwg2sj0fruw52i40kk1to7f'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '4h0t2yybd4rnyivdk8n5v4gfxbgq1piy8z2bj6ja4i2n9yujwsjlsupmvurv3yy51qt0w4efocaqque9cxsqa62o15xuboqjrft1fkh60np92lc3wrp9nkzbf90yaqil2tn3ubivcwjr3i6881c4tae70xmbxbwc'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ufkabtj4911hoets7x9j4u03259lnx2q9qyw9hu8vd5wknn4rbl8icsmk0wu2xd3suiwirh0uvvaxm2waxukp2mpvl1qpj21a59dplwflechv4d9qc05zodkgy2yu861bc8rnj9iyram9jxxbi5zmea259dsjmrt'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Debitis omnis dolores quisquam. Quia quo perferendis maxime ipsa. Fuga sapiente et enim placeat cupiditate eum. Incidunt dolore optio exercitationem libero a harum consequatur sit. Illo omnis et ipsam numquam corrupti tempore.'
    })
    detail: string;
    
    
}
