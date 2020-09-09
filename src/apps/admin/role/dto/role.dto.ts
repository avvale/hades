import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y4syv8qpzr4wx911i1mq7cnpfg6whctkzxgrtwrj8f44czt7j0ltn7prg2vrv9w8x9ms6x7k1iuv8t9g2qm9qc5df5prl1kcc7qbhtas64wm50w8t3sqk8dfsnxm8r38p2pu692gv1oe9v4ogx3ex4ov5jpkvb100jbqwbt6fq0ynsa1um374ebu4s6u02rocux869ze3vc0fc1qdqojez8ykhr5hzdsh9iouz38urx15c0lys28cfvbayh3hss'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-07 07:17:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-07 04:31:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-07 06:07:17'
    })
    deletedAt: string;
    
    
}
