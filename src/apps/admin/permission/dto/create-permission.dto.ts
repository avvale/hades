import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a3448654-e7db-42c8-840c-9c47ee589727'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'moduleId [input here api field description]',
        example     : '6d5b02fb-7368-487b-9115-4b02ecb0f694'
    })
    moduleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '47aolk6pl6rl3a35alxxclqz2xnpil20k8h3ldcu4zuj938njz9krlnttrqxww2rv04quyj54hluvtig9m2p1deo8ymcik1yixuwq1q6zv5ujp00ux3m53xekcgnkj1ayz4ckwl6aclzj9xxys2leic43p2phkdolbtf5w54rv7ttkgrytfvokzdxm2f09i32sr41ip3n9n3q5yww3yimgflv9uqa3rjtiixkjk3ayr5vmcse2rtmb8ooxakns9'
    })
    name: string;
    
}
