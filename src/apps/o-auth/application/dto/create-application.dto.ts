import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4rkgqjjprdvmcq2x9ppw0gg3qp789d1z2swdzdc1lboc195kl88npu4bj2sefp94k2e2jhkhz1r9cexqe8apx1uc5rm34l2d41b6s7aqcv9zym7i5gydtoplr91rexi082u3v1t36bx31lkg545910u68hdivayll3fm70wcv1o0v4lqtdkns6bjrk7h71p92hbyjwvp510b1a8qwrnrcanwtznzzgar8qazvn32e4wivy086iahscmp8ldqgz9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'cyyo3m3olt4skmnsot8amn98b4a3tzdxzfqltny9etxbqec0jo'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'm68r6a4ql4rhi25k26b8iqxvqp4sf4g07a3odzkxdcdkdnqnw90bwhsghold3a28cj72f4bfk2nb5a7qzh395w55lo'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
