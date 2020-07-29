import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'g7x8mf11tij1t27pzr2hlh7cdg8rxfdejcl1deu5dx7mr744ws'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e5a9aac-0829-4694-ac34-9b453b70cb58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'u03frep8n8v3iu8g6v42'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '82c807dd-f496-4b60-b7b2-46295ea32038'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 20:43:17'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 07:55:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 14:53:51'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e5ntvr5itrkb6085clh621qz2zf0ndn1kebngqaus7kjqeg8d86fc5akec4owz9bl66uivwoi88bvarwgg63ndwtoxftaln6i89ke4vyp1ftk2nnedqv9bxc9amz4zbcif7r794w6arpucd9fjginh9uk700w96wji3t7mucshugxvvfjm2nezsy645b7nbr3m8ybs5gw9m8vcbkhgkq09wf8y1ozm41dmq208f2tm4bzitx8qs44hkfgrv1u5j'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7816656654
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '6r7n3lsx54kqzr8ob0sgvpz9aeuo7mnvv7q9gzy560pr6gwdovkymrgcyjaq99zgr2nk3smeb1qz55d2j8du0w6hspm8v07kzx8gvs2hslha9bnpducg8zjb0p6s4ret4b46xwdwqcelly82aq7i85mzhyaihh77'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'i89ut3ldafw2pokvuwh2zpn4yh7x1rgkapugws4azb06gx06i6zu5eebtkpazetit7u7fjn6s3wb3z2dafp3mko9q93xfwbk38yyc8zv36vlagf7kcl9ipkjpmrzk9ohq8hs7kl59qp6owvvhxacti7sc5atsl2y97j0v956vokuc78bwy3hjr06q12h8lmj7ba8b919oqq63f6ueh6uy3ivir33lgrgkvjz8hwtwofy9sxkecck1y1tmyjhx0c'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 18:05:42'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-28 18:53:41'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 14:15:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:21:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 17:58:00'
    })
    deletedAt: string;
    
    
}
