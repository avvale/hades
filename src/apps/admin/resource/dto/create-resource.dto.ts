import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
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
        example     : 'b53gm2jr2kpht9l34qcghhx6g07ky9eisi6r403mqtdq8223gzwn7d2n31wmah66xflor8m4n97p1j6n6caeu3ojgv1oq92fk21hvbcm4ecxmq2r46xwf76djdrl14g3ejscec2qbdytxtc0465m03pjadoclt7ymi6ah66uzfnljde33jper0zxesmqq6bfzr6xknbmg9d7lp67tp6qxj6bucabt9r8jjzstux9vk8fl3em2c4cl1fu86w5t4w'
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
        example     : true
    })
    hasAttachments: boolean;
    
    
}
