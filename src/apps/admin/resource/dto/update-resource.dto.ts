import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'fd5147f0-8c9a-42fd-9562-1770439a07c6'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4xef3tgox5ce9x395tuszve26vtdk12rzjm2dnn75j4l21makqefjwajl24rctmpk66o15i92p9vocz473rrln24bonim6bn5ldfqdenhu7byk2z10y23o3qnbaz5aic8959w0k8m1eol9fp0orn40kgy9lqfrgq6zqdo7x0l34un3cw95mye1cbq3qje1wi682y9hyja76yc7dqll6x6amqhjxytla226lukapx57ei15kulyvjvw1vw1wmr7j'
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
