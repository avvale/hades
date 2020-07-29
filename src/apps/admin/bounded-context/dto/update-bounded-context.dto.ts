import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
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
        example     : '87nyqt41nemkyejmtsvawnqlg1mhxvde7z8r7u8y5hm6j9nkry49wohewxyfhnkznlxvhvtn7wy7w6wvbf9pdvw76a869gwem2b0uc5p9z2k8ld69w1a0h31h23pbzsjawr9o95faj22ig1mzhm7365f08rydqypb28hagku1je3ld5rhs2k7sjs80f7jeyhhkhnhukrg5iqrhud3izfzuh4rcsegohw2elefryv4jeh2rna27z3st6vgug64vs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '6lafhsgeanw3txxu2a5j'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 401731
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
