import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '25af91c4-50f8-48d4-bf6e-b0a0891621c2'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36009db1-fe5c-4eb8-b25d-c7e7862e635d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '17971793-54ef-411c-9a94-ef474043952e'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '894z9w2j135jxuio5wsh'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd3f70293-9927-4ec6-bc04-43ec87a7ced3'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 00:34:03'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 04:40:48'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 04:48:53'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'wckyqyw8ol7gkwy0g4n9mi9qi1mmfly8vfcyam688rsilk2ocy65293vm4hn3i7gz9lpxjdkcul7fm9fl4gwfnu34rv7roks9qbdtzgz923urt9pf3orye1bcdzwvso8xwzc2flriax0t67rhcq1kls4tkcxn0dt'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'cj6mel2qan2dherb711ikn4eux906zp5xdqf5xfwlfakang1t0ho61q3szamc7nhfh6xe11esbrajbwud087pgnkeod1vk7qcf03bo8nbf93hv8u8f5fa66ngxhqr5iet6yje2vxiio0lmoomh1ry08emo5h729i'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'fhjz09fm3kclwh876b9v97rn1eol0jogsntccjdi3rh8xf3vg841q9q2zel5ds5x0pcjph3un76fs6rss1sa4fnwb6lnteyosasi0chrbh6d3bqq4z3xvxxffsk3nxt8sblic79fqsbkp9evwqu9mrcrfwjcssz3'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Exercitationem deleniti voluptate alias. Sint unde atque sapiente sunt. Adipisci nemo voluptas sint voluptatem mollitia libero enim nihil. Voluptas molestiae exercitationem laboriosam natus placeat quod eveniet similique. Blanditiis placeat vitae ut nulla.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '0ftljyqavnz2it8h901kvmwr8qc80ks7m7i65usprkfsc1h0r5uu83uf44356k5fqyhlq7iotqxh3bj5msj4f52vhvpra4zxyr1ktzsbsc6o6td0q6u9m7l8nkyfb7t5yilfbdf61sues4cxhuybjnlqhp17a9um'
    })
    example: string;
    
}
