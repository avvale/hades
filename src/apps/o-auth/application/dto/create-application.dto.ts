import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wli5rqeimmdkaiccckyv7j4f942lgjdlgcsv0972erh7ogqsejfafdavvifan8tvruz4pj8gdic5j8xa70r50lmoosho3yl0kljvdan5c53bqpz8ybb86opapgait794khl0519e9vuv2o7x1yd1b22pwxkirbkega78arxcadwz19rda0wxlvwovoh65dhnetfp9jpd55fqjq6nji881it2b8gxkwkeuae2b0s60uqnjqzb4dub6snnfykf10h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'umaiznf2ujzp8mr1cluit6umak6q8i7dlcdirjgl3509v1ss1x'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'mirzo5a7m4o6zo0o393yby9nbvf6yume49c0ca5k7foy1yatmj4s7wjxnx95c6zxp5510ydnwaan8vu7bgz3ozmsx2'
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
