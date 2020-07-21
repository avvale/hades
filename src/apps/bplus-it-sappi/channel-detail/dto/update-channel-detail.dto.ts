import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '04dea72f-4666-48f4-8957-aa0d3149f993'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '22670223-233d-4d94-996f-1be8f793f547'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'y0xdcyrohvqj95n6rucn'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216'
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
            example     : '2020-07-21 19:35:30'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 06:05:00'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 09:59:41'
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
            description : 'channelId [input here api field description]',
            example     : '8fd7172f-e38f-42f2-a152-1d0079b549df'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'w1tyyh4qfqt7la0dh1bj0h0txcla0233pi08l0poza41rvlpvxch3fbk3ir0abwct30qdsk6n69u22p24e1nkvzp59d1jy3fztkrt18mh5s06askaexj750qstjnrfpid7t2w0aiddmd3hyxutv0do8tkpmve1cz'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : '59sqnbk6w2jopfbbyehpkr7dqd66d7t8p2c8bk1s9cdwx91q6emv2j1gq78mpj26yxmp5r7enz9711g2xwonc643gf9zdi8f773pc3w62vd63mdo6y4zw2cjwhbm2qwzdapv6xu41gryo5r2iicoxm9uod8jhxdh'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'chnmqedg74ob8i3w5b8qsgkv5pcu7fd8n4axgsze38k9impoyc1n19o65ljfyad6q2togtcnri5x6spijhelwmxdxc77foflfxorbwnzs1jh028dx22mczp7w8idtnv6o9t82mr1frveav703xffq9dipqlacsqr'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Minus dignissimos molestiae sint. Qui eos voluptatem dicta totam mollitia. Ipsa quia quasi est. Eveniet vel tenetur. Dolor eligendi minus possimus.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : '3rizuyhiam36gwegcn2cxwitg0971996sypj6j9l071alm2sidxuo8kr6d72j2ruf9rbjb32es2br5fq017xqk3cn5jtufk4dtcnyaf35vk7wv5q219k6as5o0skfu0ned87w929rp1ukpy18cuvcqht9envon2u'
        })
        example: string;
    
    
}
