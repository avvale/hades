import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e69bc319-5758-430f-bf39-1b56a867a12a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 't2neyyaz1oqcs3otritk0zuu2c80d19v0wtpw9vwk2fiwyq08n'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '856c8fb7-d652-42ed-913b-6fc419c5dd58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hop9i6p4tswj1xyi1kbk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1c2fc88e-5b8a-4001-af0a-c998e76bee0d'
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
        example     : '2020-07-23 12:09:59'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 01:25:31'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 08:43:25'
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
        description : 'channelId [input here api field description]',
        example     : '1fc7e637-dadf-49ed-962f-25f7c02c9687'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'tamowdn7c7uztykx5qrtfi1emijo1bkh3h68vgeh7zn5d6bboh'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '4jggu0tw5w1qr61ow3lrgnp0s87j52q6kx2v6u6y59hmrtb2du8h56wdnp77vudk38h7y09ujrhzknft3o3uq8d3pibcr9m260l0gado69qhou07w9odjt4jq3mh5zvz5s63w77r8ef3z6ncz4gcg44h7xib1hdt'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'hb8wlpur2e5odsvncfvtp93ewg8hbwolb7uzvu9qsuexzq8zlxgajqa1pj4l9oyt9lvak68e6wn7fkrn0blo2wp8v6gmtt4cio9xw5les4alan0nnybwakcgk9lmuexydz1hq35lh5tvljj407axera8yaaq0mfg'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '81hvkvf5v16ow1tlvnh407adwbwr5n8trfv6jj5rm6qj0vnydporzdt6yu20clhdgpyoq8aa8ipbg8vtu1ribitu4twx4d6tc4abcwcqwaxctrybriyg1ijsvrhhjrvipj76hyhy8mc57h8vd8y8836yd8z243t8'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Corporis ipsam voluptatem dolor qui cupiditate. Ut maxime blanditiis perferendis quis sit. Quia voluptas dolorem. Quae quidem et.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 05:17:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 13:34:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 12:26:29'
    })
    deletedAt: string;
    
    
}
