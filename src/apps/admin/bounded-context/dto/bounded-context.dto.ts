import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '026a47ba-5353-480b-bc65-9a0bf9402f6b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fhadltsq1sdrsjugknf7le7jbl2t1xrtvls66kzdwb859snoq8xccpfrgd36gcor3z24xmr57xhj1h3duikwbj8ttd089pepgut1w3rfu3jt5j9la511icc9dmh3ekja5u9c0wouf70197tr675wokolcs0hzkge2q4okeob5gd5fwymi132mdbz9smbh4h72esz5jr480eojqan6q7i01zbtvscqqgxpyjjr87zqzibc5bj34pxzhh8hhs54sp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'av9ltm6mwyqtkcd5plmb'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 492667
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 06:14:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 17:33:24'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:37:02'
    })
    deletedAt: string;
    
    
}
