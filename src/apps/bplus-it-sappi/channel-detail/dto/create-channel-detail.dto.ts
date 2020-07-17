import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8955fb29-e3b9-48f1-aed1-e0609284bee0'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '08ea6898-c808-46e0-b5aa-6587eb458e0d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1872191d-3649-49d6-9bfe-4f871cb90c87'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'y4zlt5t7pab4asd0083w'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bab4872b-d33f-4ebf-8e26-e24112fdb459'
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
        example     : '2020-07-17 13:49:14'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 09:10:03'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 00:52:18'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '65a58e8f-a01c-4206-bd23-33c36604ea63'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ivqt7i28e2mauvmqxrq801kfxqgfncl5y239wmlsxc22er9b0vl1s7974fkyhxl6axmtlpqfeopks5suk4nx8dz109l5e5v0nmtuev34nm627wqqravmfdsepjf0saz2lu23ddktlq4lu7r4dq42hdemgocr1qnh'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'h9q4dxstm1sp5lynl31jw4t3r09mgua4f5nu65uky39gzsos37qrhgdh39v61chtxy03it6fs0y5skbau0x1rwuzip2h7mdxbni66027cb2qzmkebroguss5l1q00twjiz11ma8hvr0xdvkkx55piqxjbg7r7dn5'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'l6i1c4iwkxhtbixc57pderlhab7ykyqpmhg6g720b3cmma5gvbvw7t834nsxstl6rzhu1osiz1pz577pma9ptck4d7b14ykahc5fwrlt4lssmf65014p3x1ca92f9iufpmi8te62goln7ko8bqn4apzuklrvopdh'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quia architecto minima et magni. Dolorem ut quia consequatur aliquid ad. Commodi ratione quidem qui consectetur temporibus dolore. Quaerat eum et voluptas placeat beatae. Illo autem aut laboriosam et perspiciatis quod. Dolores facere inventore deleniti cupiditate.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '4fcykul2dsb6q19ia60vxeuv088ptg8vdma9qy0z1zkbutc6uep1fhropmyth6dul9o8ljjyeiup228bmil0lfxo7p5g2ymr5mwed21e3y0c3grw2nizolpq1r58w6e00e2bkoz74qxt0pozoycda3eod6w6a7xu'
    })
    example: string;
    
}
