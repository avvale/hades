import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be31694e-e0bc-405f-bb9c-c12206802ef8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'b8f3d565-b9ed-403d-998f-26b70f67d093'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3yn5olk1g5ftc2o4c2ylnem19f43z2yrnpq5i6a40s6pfjxdzgwqpd1krpo8er4t4ivoipismh35hxftu28j1f78xu9qxfcnuc2mnrioet5p1pd0bds1baepaq6o85ut44m4r97nnviw6dqurhdn57k9yp6o6yxmp71xvvkymt2ggqbpllidoiszr9pf428mriav9y7mrqbpz41d0dzffdtxpyny1ddhpyjligid9b3xdcegvu73h4g2d40fc5d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : false
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 18:12:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 09:48:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:30:18'
    })
    deletedAt: string;
    
    
}
