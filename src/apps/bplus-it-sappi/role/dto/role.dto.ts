import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f6261375-4e4f-4d23-863c-31d056d49303'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6h7mextuwz4ipbjt6xw467ottky8e2becprw7ympnf0yf3tueq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y6hrnbi23svjhw9j10d25kmxtqxp1yd9vxwbte2e8kuxzaqn5mef15l81w9ymd52bsgyqqriuhz982q57jjg1sx2pqr4xsayvl13djzf7pt9y7u5zfdled0shg8hkhly3si0cc79b17d91xsyln5cdzjquft0z0tstpau29e1kamq5q8a0p80esnhno5cztsc4m45pud7j3sfx62pja6byiox3p7e86bbtf4bxmr3qo8dc68pbh8rsl6pr7iqgz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 10:53:39'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:08:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 06:12:34'
    })
    deletedAt: string;
    
    
}
