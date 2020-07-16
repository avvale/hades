import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99d5404c-1667-48d4-b10a-809991f67d6b'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9bda5c93-a5db-4631-aa26-9c9d77a8454d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5cf4t8azqu50f8s9iy2h'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5b2c2d78-3728-4ef2-845c-960c83585d67'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 16:34:16'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 00:19:04'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 22:58:25'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '3afea616-40f1-4ec5-87cf-84636acb0a49'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'kr1dow5pncaa902f5bba37hnjd1mvtgic0ry7rgxsn0sl5tv5e7i4vp23x1c7ilh30rjl8df0k3xrwogjude2pfs2syu82j2q1c8g3tply1wfgtgky7l3q6030bqgcfbdw7y8qteuumiagy5xlqtpysupxarj5ng'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'g0gl0ajwtuwlgeoqma4mqgqxebmc6yo7a27rm4evk2l3qy2u7bxiqgy0g3m70kg5othb7c08xbjic435uvnfswhsx9wqpfwzmjw1wumus3iyh7j1ij32kp7t4u6cmo22yqalceaif4illg69sdc3wqyqud6dn19d'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'tpcxnewfns719izowi59kbjblxp332gl8lwct7m53zwszyc9mkcei9mu4mmiekrsxp63uhun57ulwym9540b14fiicvebya3i2guu5fg5k4m1fuv8ny1ir6c1842gaeuqxvpmxlwshc6je6qupnnf1ixd7ukggqo'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'In reprehenderit ut ut perferendis vel rerum id voluptas. Tempore architecto ut expedita qui tenetur ut maiores. Quia molestiae autem et itaque adipisci culpa esse veritatis odit. Est repellat consequatur repellat nam quod nostrum non non dolor. Officia minus magnam rem porro. Repudiandae iure ad repellat architecto ullam.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'regiotozish6cjhlglmi1jqkhrxoh7p2xuzj7c4qojqm8p7zq5h7m80w9gd1i97561aaxau13jwjt2knysjsabr81nndftx42fq0rbgi50qv1t1ifzgo1kr1vggvso26lo7y0sp8wuoxpg3unke8axa04pg80ce4'
    })
    example: string;
    
}
