import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '35c7033a-a9f1-4378-b2f6-31ac10190849'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'be1e4846-c166-4a63-b080-cdbb12d02b42'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '34d50977-a2a5-4f06-b2df-b3411f41a587'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5ksiqgzqwejuqhpvdlba'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb68760a-bd5c-4ff9-b194-14faef31ade6'
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
        example     : '2020-07-15 08:39:28'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 14:45:08'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 00:09:48'
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
        example     : '66b34d6c-887e-465b-a19c-8f850de1f93a'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '32t144z94vuhv1i646pokxgihmsex54wax0jz73ihh20ugicounxzeuu468huw078s804cszpiiaop9zh77ceb7b4dp58vykv0gzqjj9ajxfokd7lkrk8z6x03yssktqhmj9yuwm78ub1tzj2s9jfo06hpi1c94q'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '7n89g7ngumrcni6tdxk70k9vuxvljenrc2pgeujp86g0obu7y4cmti1wsoy5jh22o9aqo7dw87wt49kxpticm7pjkzj723rtp9omelcbxekhsjqi1kqxvisiecsfl7166hlz1893gu87rqv092mdf3y56iyusvlv'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '7ml5ydgeefv23jm9aa1l85ejgk51u6ctz4e7ha0s6mxx15u7o0138ojahx2728iysyq7fgu9l45tgsxtpi3i0ca81gwx92kwcorjylbqnsb1cy315hhj027o6w3hcngszpnjukt3lkdy5fpys03lvy6qrol93y2s'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Voluptates illo ipsum et quo qui voluptates. At minima et vel officiis ut. Molestias dolorem facilis ratione inventore officiis optio minima velit veritatis. Et sed et sint delectus quia. Asperiores numquam autem beatae doloremque voluptatum sunt nulla quidem. Incidunt qui aut incidunt aut fugit sed ut adipisci nesciunt.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'zgghhbhbjtmnrzeezvnnhsu0538kpsxwtin5c0lcjnhfy8n0mfp8ca7d5sdb59iebpyfdeyi9jen828pghc8suys21sqk2phat8umeuo1sra87x0lakassvm65uogm4c4v2rh4k9f20aqoqu4w2lw1ik044uulba'
    })
    example: string;
    
}
