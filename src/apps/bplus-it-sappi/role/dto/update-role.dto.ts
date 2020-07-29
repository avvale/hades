import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64a2c4b7-7233-43dc-aaa8-5e7554b9b380'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'i02ei4vwopdvp5yw9rlr7gi2hokstj4lql6tkxq4ge5klulj8b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pyhhcxib27idk3qq7ecpmvrflmv5mseacxtqi4c2gc3hul9irjcrqs2js3pqvyyw2af2sj80gp8uy1ub42fphqf08za94wpy81tia59zjot5eu4ujdie0zgv5oxzkur22vdh7872n3x1svba3vysc669rbgky7uljtxji2ca03t95i6d5gt9czctsmw2a3syt20hj1c1d4nc208w3g8mbmyhb3ub0stvwsalqyxuiwyfsq2p0ftx7bwnk17djvy'
    })
    name: string;
    
    
}
