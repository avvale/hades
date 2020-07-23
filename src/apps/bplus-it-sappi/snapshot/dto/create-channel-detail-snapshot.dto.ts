import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailSnapshotDto 
{   
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;

    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'CC_S_REST'
    })
    channelName: string;
        
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'BC_REST_CV'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '...'
    })
    channelParty: string;





    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : '86589264-60af-4ace-a380-4c2761014c43'
        })
        channelId: string;
    
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
