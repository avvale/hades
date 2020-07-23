import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dhj2sj6gvzwmogetjh7rfste7j12ijg9r9wa5pjhz5k30cu0pp8t4ejxu3x5dlg60j2cke30hhj273dw5s72r2yhswso8fj1rx8yin4tghzgwhzjitf195qs4a46yhbptdukerjapbsvyfmde85bri4038yfop0gjfg1ue208s93gkv0g8mergu4w7blmhwtt5sf06ixjia1mon12m4qnszip8ne721wbbu7g86poz2aeopnlhf76bjjjwrr755'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
