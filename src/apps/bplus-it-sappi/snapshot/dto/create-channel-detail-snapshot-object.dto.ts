import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailSnapshotObjectDto 
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
        description : 'channelSapId [input here api field description]',
        example     : '5933d66869f237f5811678aadcbe91c7'
    })
    channelSapId: string;

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
        description : 'detail [input here api field description]',
        example     : 'Eum quis sed sunt est modi fuga optio et. Et ex accusamus unde. Voluptas praesentium sit doloremque repellendus. Rerum eligendi incidunt. Voluptatem aut sed. Non natus dolor quod exercitationem quia sapiente maxime non debitis.'
    })
    detail: string;
}
