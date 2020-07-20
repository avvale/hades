import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'wx776cjr6y54fpoi9jus4bbyob2dkqh9rv64n37bwwqqolhq79grnntx3ldnheswlmqk6ndu8k2hdklklcxu0knldpyyfnojjk0rftn5wz8v2x1gpf5i7odjsc5kg08k071n06mqcpg45caazhttr7wneyznpqb6qwow5mujhtp7dsbzatu1bnb4r0kfuvvxmr1kaysdhwomnotm7dhy58i1tuo3m0oo8uik0c8gxdxf4l5mjfz4trwlmyxujkb'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'ez3hvel43q1bieqfayvg'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 799611
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
