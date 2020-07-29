import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e98b198c-a3bc-469c-be1c-451001d6adf2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'boarg1leku1kdkwn1ah8ebqtot4261b33d3pzsoyjs5m54nwqjfnj4nb78dxzscap7ctzntk3vmwtv4macnt16vxouzwttvjx8yrihce3yhuubmysu8rde3039f5jix42vusl8qdw9v7dmj0ij6vmtnn8nrv768498uc9keegywn42ch1jkn44dx9xn4v89gy9wo3gg0cvmce1fuazgc6a09cp84kdyjyun6t3j7y10hqdtuhg5kyspi1nlilv7'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'o6zj5ya38psmu8pvk6as'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 812905
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
