import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '63e94615-5741-48f8-8632-fb55e367792f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'z5r2ta4p6lojj3i9nxx1qjmgvkg4wqbgwsh2mn0nozig8u3tz5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '24jpu7la1gn6fcs8kvom'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-31 09:50:13'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 03:56:18'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-31 08:15:44'
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
        example     : 'stc3ta2hnha8m19w2ibfopqvbc3kgdnxcfydtvhjb7xlmu4krzvjqpufyqh86q2qakhr312hfwds43it4gqt7ugjgqluifufnmzz51ocevvz74d8ni9wj5kkvn5gfpunsp0f9g3zs9o5y3fvkftiwnfxlzyizj87r0w8vrofaholz2evn8cal6sdanch994ihrwqtvxjjut1zvrhb0umcs93jqgtcuy42wsipzkwg23d2yop8dmo12znslmz46i'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6089120948
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'cu2qoiuw3gm6u0aeuiqlqfmq0y67s83p8y6fkehx54t1x9gr4nuip989ib89bqh9nmx4lmtc2ayzlsivt1iptjx5eqv11aumsrnve30dsvlgwuenb9rbo8lkzfytc3n3ganyd35u9jgl239e4tkoqv4exyw9m8rg'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ajq0aucsgggi089vppwyru6wo0c8g2n0oo9dqk7hve5j7qb1fsp3o8zfxtfn502r4pv1cojjyh8klicz44pjs5cqm6f0vz6imxprr0u45wq146m44yejtlx8d8yw777cmhxsug6356rgj2nkkcsg092xsjmga0kckn5sm86j6hfb0yqb5f3b68vlcthdi9zgnwb8mrd9bqrnwfjgz8yrocldrq7alkpw0k2ccbriqqi4ovufcajbfjag0hg8oxl'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-31 06:50:50'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-30 22:13:48'
    })
    endAt: string;
    
    
}
