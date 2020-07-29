import { ApiProperty } from '@nestjs/swagger';

export class TagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '20da9779-7e32-474a-bb18-e80dc5561456'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 2370980920
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8252d797-ad18-4335-b200-078de890abe9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6soyrzn2w1fsocjwyiracniilc49y3d1pwwjarw868obs1ac3p'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : 'tycf5t9ffeymhal4a8bj5379eocxlscaa7plo50h2wzro3ddky6ic9cbfxrwd8x5bf3f2gz864kqtqunzxp47uccqj1j0qonsom9decztwtarr2tlvcvwttotlej9rx49h23yhgeydlwqo0893n8yegnd3gpha98nlp8wu45smoeudj5r7librn5uben7qbnraeu7hfbsa54gqimmllrtsa7ahdhms8tgaqtpre8xxrkr37q8hng1h2k2ca8jkl'
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 572505
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 18:08:35'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 08:44:47'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:39:50'
    })
    deletedAt: string;
    
    
}
