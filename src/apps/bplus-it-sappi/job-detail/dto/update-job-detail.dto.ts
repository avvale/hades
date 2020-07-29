import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b3d2be37-3976-430d-a139-3fd79e8f6f14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'phiiigqfdbiacp00g7cdjvyinjeimph8693y21o8m3fsjyov3h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a7fd06d3-5360-4bd9-853f-22751f93032a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zhso050wtml4fgg7mvhu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '42fc27d2-6add-419b-bd64-16a446c49580'
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
        example     : '2020-07-28 21:06:45'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 01:41:55'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 23:06:48'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vvdxnre9uj70w8goe96u90yvyeu7bjc423yxyuqwp0pq80dgyz9eowmb1pwswgg0jhfjkzac9h7wjsvx0sbszgx81ds9njdxtffbkxnqdcqk682ehjm64k8ugc09xib53e245i3xw5gg9ngg7b31j6eudhp531vt95zoeennzhns3kq1iw8dlyfbctsvmf02c2nx4iczff9mcaymdmibtbnjjbhl8vj8om56y23015u3x6owoaii8radww3g82u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4728029176
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '4dcxv1qsnrtsiicfq7eizq0115vyxan5gz2dvdv8qey0y6k0y3ydre5kd84qq5eupfow5wp8832g2y3mss9xi2ga23a5rb9zsmion5bnl6tylpmufg47htlqy00wf4x7tr7o72rdslql4059m83kunsq0n0dsm4d'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '9zzodiotu9pwzgp1w2wnjm4440lqyc12q2nkxjhgnyjase37g2b9tycfykb2brb0e8kgbke67q335ewfdzsqgef57jls5zs9ohkui05h95s702tkvvdj7tfjj1ywi1nx9zkh3tjq8qv8855m43q7n3w75xpnv6sqekad6a6ntlg30zqrn7j0p72sf52wfx143b2ojieg73igd5qzjogpn3cppo3bitkn249rz2lhepq9ujzkop7ysn6y9lmdydn'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 11:16:39'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 13:45:42'
    })
    endAt: string;
    
    
}
