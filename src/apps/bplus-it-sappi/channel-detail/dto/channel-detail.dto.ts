import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8336595c-4691-44db-bb63-a7fd9c7f8349'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8c12e5b7-3d27-4955-ae4f-10e545033b47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'iu3g6gnmco5wa5vluywpf4gqyw14mjnaairxs21afblqj14cza'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '72677ac2-de78-44cd-b75d-06bb7299013a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'a5nq0w7h3g1mmnb1uksw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50'
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
        example     : '2020-07-30 16:46:58'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 03:51:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-31 01:14:30'
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
        description : 'channelHash [input here api field description]',
        example     : 'ixm0g1i6716rb9ezp9zcf0sg6gmo6bizocv1l7b6'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'byl7ty5uku1xngio5u37j3clqwqs928u68q7izxcumjmuqxht3'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'dpv5zdpcqa5a3eg0j7y16p8ly2o2w1wurnbnxio4j4z4gq5hnnal85fd1pv6wg8yyp1z0q2jpzvogwnqyfkosjhcm61b3glo8mdk4j20a67wm6dae9jm5j2pu2oz2ordkv7cz31tedyt8nqjcuktteikddo4pluj'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'erek190k203vbe9valqz1m7x8fqejwhminzrlng3itf3r9of9m388cnc39iie44oseck6f14kvfmz04dda9akbryh5jmtvc5p9z32inxpf31yi5k5hdbhxah6xrgr8a1k9dbnuhq4rpcpntv5b00xjnm89lnapmq'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '8eb6821yvmhs1nuagsh9fm01jpb2uo8abgubvfx2b1vryq04oczt1kyojopg1vjshospzjyk8uxju6ohzmrzoubvguz400uw9en1bvm8jox3o33vc7y2emqflelpowkldjjndrep8o887qxrhb3vuk9rleg48ckn'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Qui illo nisi ut. Et autem qui accusamus repellendus cum. Soluta excepturi doloremque iste earum consequatur repudiandae. Consequatur officia earum sint dolores eius porro rerum sed. Illum ut assumenda saepe qui qui.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-30 22:03:29'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 10:50:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-30 15:40:21'
    })
    deletedAt: string;
    
    
}
