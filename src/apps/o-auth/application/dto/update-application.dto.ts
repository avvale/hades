import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6fc34f16-c1db-45ef-b887-8beeda142bee'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r2obcw7cge4q5d4tlzki6ktvf2w0d5sjhydii501s80ylbtqf8f3gkgpmq5sca01h6j36f0myb7eclq5nstmofn7c4ei0t1ws5oeg15bcq50pu6n4otm4s02ezzp8fdracysq0bkaobzntzjyyhjkaerul0af1st18iy2slieahuynbkdquk6mot11157s4w1jg8kvjvgwyiq6gy3l9ran4fk9v6aptxbvxphhkl2x2q2vjldbagz0awmp62uhb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'nue6dyrzun5ddfm4e80vjlcy7454icv3kplc6jvriigb2gqc3g'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '0niwl65ijikxf809x5pmjpjfshs92tlkb49y8emyh4tmkbxdz6ty6joiew65cr8uqwwbmh6lq8l6t4rv0ey0aj2a34'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clientIds: string[];
    
    
}
