import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
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
        example     : 'z3m0dawq4kzcbkt8bmduj32cjpptldj3e8uebgyom3psifftkt86hfkesb98alz2q9b3fmb19kqk3pe3hc8qfzs3davtojhuf6ibg3dd3wbgyrxktks0qe75syb36l1qd5lbw2vx990mwq0qf746reif7q533n2vsshca7unylrmbdvug539h2dge43b0el9skavltxiny9lcijmr8tx8yt9qg48f2q1rxjjztghbtm0esnwwc7hd92v1pkss3a'
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
        example     : false
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-07 08:52:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-07 20:42:27'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-07 20:02:00'
    })
    deletedAt: string;
    
    
}
