import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
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
        example     : 'fjhtfbss28fjl0rp3hwh'
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
        example     : '2020-07-16 06:42:10'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 17:33:21'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 00:39:21'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR'
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
        example     : 'yr48hlgago20s7hdvqlqirellomcq4fxo6e5a2y7zul79j3a4z7p9i7my5vn16y5vogl8zc2bq7y0aqvkw75ams6zegin5tuq0ipvlah1v180c0b4aongcwnft9zz7lpktdd6icqp5264lvm0wo5rsx76xzrc2sq'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'zsucifhth37xraqy2ly8med2zrhhna3xcce12jqt8brj7q04ci7ob7vwbzts5tcrtnk082n9w0f979eom537bvtyzzboee0u6fr2ztkbmf0qwbobmt0zr0ym1zcum2l7q5lkmipmpmq11s57es777dm91i2ybis1'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ohmhc5gd2ko07iwkaoo06nu3s1g8nw9p4xisrlfvi0a0bjgm1edez2cgszjvh0t09p9qi2i51j4tffcj4ofa5h4kum7a3osunai09pcc30ldy1ix0oos7vdoxji47g9fgg1tks2wf7qq66n5r0379p0knnl2xo6k'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Repellat voluptatum dolorum voluptatem id repudiandae quia. Id et officiis consequuntur itaque rem. Vero eius debitis dolorem mollitia in. Magni assumenda qui officia. Occaecati voluptatem et sunt aut recusandae sunt.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '0vcujshxdunxyn8nsre3aidmckpd4gndo1i8q2nmfqa1brww8wa0p5ve2f89ecatqpoxa9q6hrg9mx1rotonh9l1360l45ff5evkdn3muwdmtt5fql51bbso4azd0laxufrcqqmu98hsu3unnsc8lhdxowwbanq4'
    })
    example: string;
    
}
