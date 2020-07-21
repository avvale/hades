import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '31088825-f57c-4fa3-9757-103a534e9206'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f34a134-de5e-403f-b00a-95954bf10fa4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'b2dozqu8160ubgcsb4mq'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '329b2892-f556-451b-8d96-e301f8b7a390'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '7p8w9fr7gecl68ezetv9w4k9wwujm2scjzn0tplicig86jsen0amvv3hl6km46u4t6xg6shi7si9yp1vsy3mrb7cybvr8stzrszugbz327uokcczctdc1oa5p0zd3n4mztn2si956gq1xe29smtecmkvwd74ygyob8ax3r4xzempzrf99hzkydhpe0prj04msak2819b3j76nd2l4ya4mh7r6wvdllwi3lz2w3rs5pbxuvb9ggocltfehlkw1ui'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vyx9y4ykoi3jt4lq21w7gnwa4t8elmd4qh1ckn2zaf14143sqnuip7edwt0lxn9qqu84e7qbn4xwi8w55ulz8tr7aq9ibori5060w4f8lgklmxd7af2cqmyx1oia9nl5wtyi95ycqr8a6wvix0vxxqwmsmrpj4100w297kliaokzum3i0qxc6zt7m4q124vvrw89stm3m2n55ch9ru5k1b96wfiq4grppcweknblsfeq1wu7u06y5zdouzrlgmf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '6bc29mr3y20n1usnqizn27irx463q6kwgi3v1jdnwh2i3u4sr590isl1diy2xb3gp6ykb0dylgtnloykfnfv3ywoyu5ypdeng8yc8eczhkpka79rit85q0g9bhqgp00ylbs09giggs5gbidxu8vbdvcqdesnk2fzuari78rn208prg79vx733uqa29m437d63cm3yaf0o72fsj3dreb649quqfysi777awta1q4smbfih5281w0lqumkqnqndy5'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'gfc3w5gr1cfbc2gntl22p1pldrb60cxdqqmeyxq69b4jxw5w0jmd84qxx4vsmtcunbvl4ogqvsfsyava3xglytunemtqdm68792e11ccmfrm41lqz4z3w365'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'yunrrigarvph9nz54bdjjsb6vdcxwg9n7f00yxjn1jvufbbf2qtx9ete25ke'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'robnwmev9tk72tuzuljcfzdvilpjjalha44cr5sm3jj6ig7dy4t80e8lblaez0uj0h9z5jr4q205zxzzitrke7mxf0s4e4jgk0trsmmamjvoqmzdykdjz1p9pm3eat7oldnibvzxx72j8pjyp4i0ic4oajik4uexmakmds68n7ojhyaox5hor05ep2lhicqsasdvrfahau6bpbflgat2upkl7yyurtebjgo8kjlew8k4460umsdda930o7yle25'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 08:23:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 06:44:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 21:33:42'
    })
    deletedAt: string;
    
    
}
