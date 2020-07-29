import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
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
        example     : 'evyknlt99ochgsqkubb9wb8p5dz0c5k46td1rq8svm65ie439rpadquwj0ivmsij5tl546peziwc6gllabkz8ls04ek4lw6vd3t82espyzx3c54lr7bwmm201vg8ukryx9c66z140x81o8hnxd0yxbtkn1fjaa98u29c0ny0ii91azxszz75qac1lrsgvrhyt0wpls6jdf67dqok8bhix9v35ln13rcszqmqhyyycmnf1cillmerr7iv5p1ze0w'
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
    
    
}
