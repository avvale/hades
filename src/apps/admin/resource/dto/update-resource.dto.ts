import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : 'c466f698-71db-4cb2-ae46-08604fc10fe0'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'tf3pjyeyh6aej4r3ungcf5er5uuspnrzmz0c2uqgdgdla1zkik3qoo9wgqk9bicg8ar9iv2l1mef7my73vk5qehmm7hgbl2hem7pw8pu2fxhswxdikxkir2qhkfizwdkw1ib8z81qz456y23tqobt0l0zif9hmwbg3pd6nu6xjcgia2h1d0dsvreo9rzm075c9ltmte8lec4tsidah1vl5q1bvx4cgtt8rp1ei5itn66wo755zbaygg56qx6zzg'
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
