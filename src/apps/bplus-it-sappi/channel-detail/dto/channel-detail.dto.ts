import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '50256894-b4a5-44f5-808a-cc75dec00e7b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'icmwm66d172t5f7fw8f0ev0s9dz6ca3437x8jbxiuoh1kfctp9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gygggeajmsjsmjpu33f1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '143be2e1-e31b-4a87-8a70-5fe8ee6318da'
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
        example     : '2020-08-02 21:59:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 14:58:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-02 21:16:09'
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
        example     : 'gbgfqn0vzl8w93oynlv765b1k7egxho5s0r0re0u'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'gevpgg56eysen0vhy87pfx3jiq4la02iapt17soov9hm4lw9g9'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'i6bzy230betaw7zrc3w3xga5h7pagvdbb2c8pgnb52ro2pb9xoonggbg501108xrzksq570xxid7o1p5h0ecgii410dzp7o7jgo3zlopsz3hbi56r73qvnj6t8k8z2xi6l0m59u046gks4hkzqoca5s2qffi9zma'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '7i85tkcjo8byryugpfq0xhs0mtp9vjulclegmr6kqoy8uqygiq9xuso3k134e6ddf4tl0k4phmfi8h6sm0efsffuouyy1guwub7au7fp4u6ab2feqw2zjo4qa6buaau3dju730ezpe03gfxq2k1a3ndgqm7i7tn6'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'y7h6dpxafj5vrt2kkibqtsu9tw4d6u2cq6g00bxh3mj4qctpi7roywi4ptwhtalkcsoi0mepif21v0n0ph7uh76uhkhdtjqatt36psxne9lbjrh5ioxlpzilgd31800t4gk0ltbi799x199jlbxdx65w1r1f8hib'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Consequuntur minus et aut delectus perspiciatis et quia. Aut sint autem mollitia labore voluptatem quia voluptatem. Voluptatum omnis consequatur est et corrupti illo doloribus a vero. Commodi nostrum dolorem qui quia voluptatem qui non. Fugit et ut voluptatem optio sed natus. Labore maxime ut quia.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 03:46:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 14:13:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 09:39:34'
    })
    deletedAt: string;
    
    
}
