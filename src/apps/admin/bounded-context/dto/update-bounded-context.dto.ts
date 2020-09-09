import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xn07bxm8qogyauwcoe8bhyro4ux4n6yccfwr6pds9akeqhpoqetqnbtw3h63wzbc14cwe5rmcqbe9foz2ushbnf9qhj0tg4mgfm0bc3x3lady9jdbs6nxopof5nfaj7coj1nwak8ishqdiugddzg7dyklvow1dsdeuasn0b89a0mp5q9h6ngdbqyskmb4wx31rwlgqmt7y2hn8rgs8i3c0jbhpa9l01fkkqbxxmherzl0a8s98zeplwaeuo3spi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'ri6b892oefn3vdio615f'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 181703
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
