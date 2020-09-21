import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
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
        example     : 'jo2avnnxtheo23ll3pstqnpwkni1ccc10w4r7a87hz93e9edsinrp3i29lo7fjp57vykn84puuznztaqfdwipn0sf4o1bnnhz1ay8qn0ypwn1trudtt9pujrxf0e2a0mu7ska886k57qxf4fqmgvhn8memz3tbigb2rxv79sgq6q13qtzv0um82e6af8opl90ffaby4h1ih0d1l5o3ln8fvk8ot62d4qx80b7i7xkopk8qwtnh4cbbasooz9zq4'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'rtdmfs17xn2mt65nav1t57lgcp0yx13eiu1ljtqtg94vmjmylv'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'zkkkmuy77jkhnkfu2m8adnflv7nq79fp8q4h5yyxw0j4n4j9uxdwtow3ynjlxzaf2v4mgyf03ji9x8renpcn0kgtjz'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clientIds: string[];
    
    
}
