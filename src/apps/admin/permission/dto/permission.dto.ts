import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a3448654-e7db-42c8-840c-9c47ee589727',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'moduleId [input here api field description]',
        example     : '6d5b02fb-7368-487b-9115-4b02ecb0f694',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    moduleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8i36savgvcghlvyvhyzov7mjwgd7baamd58hbx7op80sy681s1838u51fbitwtbqez1trujgoh7cfouvww3fa07ru7k0m8hr05n0fj1mbay3bti8kyouoopg4i1tedhgmofls8eks2gbmt8fmt9i2x9i0fwf313vkv3f0yo0elcmeyewhcg86q5mg1aij4rko0l66aoopi1ua53un545g2gvaey9vuv7764l14czcikwabgasr45u0n671o0peq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-06-27 08:54:35',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-06-27 22:36:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-06-27 15:18:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
