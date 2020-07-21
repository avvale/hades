import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e6fca3d1-f082-45d8-acef-1dc470294220'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '8b3cb4a5-c55e-487c-a024-fc9c389fbcce'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'clopzuu76ranmjp659oumbjfi0dc9ijx6umdjcxdt265vq6wj3ca3m1t6khgc3386q1ays9ij2pgllb2xa8xuk0q2bfj268rnp9z7yj7g3vqpskyx8bgku6tos25zoqdskgqbvxinmeottpvmvqvg1bvajo8wn7cj9rl4i6tcid80gqzo6nqk32qvaccco51ll4ds6hx6f507o4t8o9rakymi5pzzwr78epcy2tczmpjejgqrdi19wtynsssxm2'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 02:52:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 01:41:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 18:05:47'
    })
    deletedAt: string;
    
    
}
