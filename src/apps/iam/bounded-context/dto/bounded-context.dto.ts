import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gsgzpnlf7ikslczb4sc1c69qpmgnpndx2k0m94u9frjh9e5lh6gc2yzyt8n6rwokrdxwz27djyjd8sl0seonve9fd6nyjpl5hnfna0hwhtyd5jegcv7q3tazargpud3ao0ib6fe20x6uiua5yuh5thdmifq6a3hb9u6q5kxcwkpmobxkb9xxbpsw4ahr2gjv3e1sb81w8gd8h3mans335gnsewjq96jpznxf8qxmf381l9uez7d0jluvowk4jhk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'k6juxvf1c0ohu7vdkke74q9pz8geab'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 884964
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
        example     : '2020-10-15 16:40:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 07:36:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 08:18:52'
    })
    deletedAt: string;
    
    
}
