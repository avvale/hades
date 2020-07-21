import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '5b766746-0377-422f-9532-537209df1406'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'f0dfcb1d-30b6-4adc-878c-b25b89bca551'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '03xvsvpf19jdmovhtnl8'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791'
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
            example     : '2020-07-21 21:38:20'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 10:48:43'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 14:02:11'
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
            description : 'channelId [input here api field description]',
            example     : '86589264-60af-4ace-a380-4c2761014c43'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'jhmeooagkapy4feo8aeatp00p6p1xwmptkva5ot3qs1s4yyqd4sen1rnkyf4rfsktc40fculd7k25iti6vu9ja32e46dsey82zcu9qx13ucyojwdu707vrpn9dq9ozdlzr6zowfkd3fpzvyplr1ff3mmwxpk8n6w'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'lygo1v2ez0dkw0ijs79253zephvowwmyrckqkea5m28b8gngiqd8ai56p8lkbplpy00uttt2bhvq4l617tiof4o17zkgiotte33a7ebtu78wqsz08qyze6it81xsmp7z9ks0hxkomdzkrpjwsadwrn7hlmzh3gib'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : '421k3gt9m49ipqva2f05qsgeklt52v9c3gv2m5avtm6j1e7jniq879ly7pa2860mpopuk8mvby0k3f4o4wv75te15jczy2kjs7apyjfj9iw5hnwlyljje9f1538ztrj26458163be6wgrh177wa6ilwo114b5go5'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Eum quis sed sunt est modi fuga optio et. Et ex accusamus unde. Voluptas praesentium sit doloremque repellendus. Rerum eligendi incidunt. Voluptatem aut sed. Non natus dolor quod exercitationem quia sapiente maxime non debitis.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : 'vonwvnscko58s5kzdnp5aok57y0nnyp4eulruztu8w0bwn48q6zxn8vyv8d1odvgctuigb7bdzbs9dl72nicrvoalk2mwzkl3ckvls2vi36276aa0ruojqdvpvx253449p8zgowenyfalnjhsh7x9tnqe1vk8as8'
        })
        example: string;
    
    
}
