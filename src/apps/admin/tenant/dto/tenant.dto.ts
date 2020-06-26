import { ApiProperty } from '@nestjs/swagger';

export class TenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e243e17-899f-42a2-8d0d-86cef1c96469'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rqyb3k2f9p2c3bcfad3ucnondil7ofis4ecgsqxej415yk0scokeqlldopovp1g85a180v3bxfopoxt1rxazcln9hpw67hw593iqc90qa1j16ekw5trao6526npko840x66qyqq2v3zioi98xavp5k34dg741fh37flen9lga4ss2wv0h5fvz3aliudmmpmpwyqbvee8nzi03ggumnhw67e521ac5wq9txuw9sa63vaw96crdz7usstzyeavf37'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'sot2lxkmfyu2xa9zhg04xw3bgn27myp1w2wqohx5ky7c7cklpr'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'j3erytapf163k0z4fah37mfy19fjjwvlvn7trrlrvmgd8eflaudbxcbgbxoxxg5bvxdpy62qy4c3xew40aj8j0k4uau7x40cfxanehpsvdb3ekocxxz9ufvte25xo6v8go3lz3drqks1lrxajp1o1hmlgqgywqvi33pezcclwdbohahslfy8s98ue2jqck69gtp4tuefjv1vlfn6jyimd1w30gpa0tkixdb0ohjj3jddhdhokbuib9unj9we0o0'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-06-26 08:14:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-06-26 02:16:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-06-25 23:39:01'
    })
    deletedAt: string;
    
    
}
