import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6bf26010-a993-4870-9263-58c16db28cb8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cb75a608-d00f-4b1b-8c96-ec59158b5bec'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'r9a0o5x3v6bbghk682z5gsmbbmmrgosg04wnzyei7kj6u9qpwv'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ce797352-393f-412d-ab4d-68f1d8f2d600'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7qjzb3rcs4ngcffvf82y'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4738be3a-7976-4914-aeac-c984332ed211'
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
        example     : '2020-07-29 05:23:29'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 09:24:06'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 20:03:42'
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
        example     : 'varmm0v90tj564rzk0b2kiwu4p33z8nzp5f1or1zfm24hsmbt3gx50aaq2dsxc4b7pjp3p44kcy6s10rrmqm33t6khlelydnr0ddmt763ut6o617xf8r1riog805fme1k6wfl63e90pofpx6seat0j26rwsdoasu6el1prh54pc16g8d79kntle1e83o13y21vu89y3gew9w00xxv57o88cxx91dllx6ekqif2xs5bi0lwtbi5wr7s4xpkyve81'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4040795348
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'jo0kb099qx3mu4i4mre6ccbgq31bdt1m40v9vh9icsj5evlw0glmmnvs84jpvczx249i4144xgjygppaoxvn94l0lpf0gjt7tn3st2bt8sosocy2ywgdw5csoztu9mgi1yogzrwl8cl297559uz11f7hv1njxulj'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '39iaryziyi6tqvznc07ay85iv1zloj3llbkzcpi81rookv9ll0ni9gcti8hwqsrb86la11rt2ct6btc8w3lm7x4durjg9fnlyp3d6wjql6eqigmks0ysthzlq9gv5mkw2bye4wtm9sksaqqha5h0epq14gfac2tfyi0g8nnkdad71s47396exui0zhgul260g9muelqe9bdisrf27kkiyr8vocxwmanpm9jgv386m0h2spdru0n2esjew5y8vou'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 18:54:40'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 04:53:38'
    })
    endAt: string;
    
    
}
