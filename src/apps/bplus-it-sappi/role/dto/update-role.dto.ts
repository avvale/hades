import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c4410ba4-c699-4d90-9b4e-17390b35b42a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xezns8cqwaw9lwcjekybbffygnf107lhyekso3h8r2rezicak7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wiuhsomil9h4dkf1c6hkhivkud0e3xm6z39dmbtmptecpvsaj2rgh3c3g94uujvmv590hjdzhcw1py5d3428s0vs38j62wwzsw7sef93tyrq11p0y9nxowj9pfwujk0080q6plpdj2hn1yrr7p7l2adaxasyg48t4bfzm6o7o4vz84viwq0a3cozg6u0adqjrxbzcvnvq7wdlqfowdlvqcqmcsnqx6npisc6c75210cf8zhh2c14bgskauj9m1o'
    })
    name: string;
    
    
}
