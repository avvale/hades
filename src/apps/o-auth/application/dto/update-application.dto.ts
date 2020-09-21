import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bbcgg2vbg7wu4tw1q69ex4kuy41rjgidgn3vi6h72gpp3pldl2u1jfpqdxk1g8vgcn1b9yylootsbnkemm8h20k7bvhka8yal047vjn5wpuck40daeaf57zuo9jykq69eztqldw53zgida13g9i935pmvh2tog08q3wkszez1o3mphpjwm3kic2glb7ruwyy9i5xp4nj3zkeeu5q6hclw2f3433lza6kprchbl7s8wiu015nuk878gxbmtx0cbe'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ux9i00p2j2lqa2oothhqy4ac99ocdysfs6a4lpbke128w7k0yx'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '3fwf6g1cn52n3ld6f5a0p9af9mykwevwzs3e5moyv4vaxe1hvm21fc1uxzyjuxlvfj5b30idya9c8r1upfu11x9ew2'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
