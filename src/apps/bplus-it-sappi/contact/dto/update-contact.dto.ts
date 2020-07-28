import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'af06e73a-a913-4312-868b-9aefef33dc29'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b741d8e2-973c-4e89-88c3-ada737c839ca'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4z556aijqnsjqdgozrxjwp8donacbcg710d6iiw9ilporicidu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '083426f0-6fac-44f3-8805-43894eab80e1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'goyth0zuscapnx8h7e88'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '360a5cd6-ab91-40df-a0ea-9a99a91260f5'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'lw87vmozl1eru2nwriv0jokm2ocuaz217elvrusu5divgdnlkl0bmvx5whd0hxgy8f9v20w8i48qpatc37w8hejxfjl60xoldeoqjwn30b4ku8fvhqx6xr5ne4qqvg1xdtmp5b9t7b14sy1whcmfua4sj9yeamwz7ggvfwzvy4b12g6axfysga0vpjgvlb86h30qtw4ts8uxzj6xg8zih17nzmdk37dpwweezvfw778bg990zq0t64udyam46qx'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e09emraf087qs9clws6avxvjkd5891ijk1qnu2nws4uwn2ptf056vi42bbv9dgfb8ipwa513n9gkhh1wrwuxvatad5no5whbag8d65bn0p5aetc9y3fcpmutwgz002g6i4squzg2wdfh68aktiekf7q10kjdzowcuri0jna7ojhn7iof00rd1wf2zia9ebqv6urhobyt9mfrjfr70s1izr988fpogjnvdcdmcfnkxk03xz2348wt4vazqvhyg6u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'l0hjpxbvevda7vtydu68eclf54q10gh9bijj661x6jz7cp8zz5ra7n3fvelazb5ka8zirnm3kj1t939qc5mtysew25to9spvwpwgjt7tjzprp6l4lsftjo7mlft0qx5l56g890qt1f6fotrwxa7i747xqz0mi4s694t2mzxy0i1nmq1l5wcg9ny7543z0smdrbj6ihkphq0e18jzxj38e7b8g4k5dc4uivxhgfs7f1krvd58yonrbhb3lcxopfb'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '42yfrk6f8gjxpirywtl797kbq3yywrgppfsh0xinqorzpuvjmr50zp29ufvoluwp7gi304ucq7j3nhkpezbkr2s5a5kuwscjjey5av6i9yecww4xm64t51tx'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'm1wu24k70rhjm2yaihsaq3cfp303v1lcm76b7qpo7la5rp6uz45vhnlvjtnv'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'oyrol8ylveq687d6edlew437pcr443i4jc6xkyzyxsqcgma1bmiuboa2fecjpnyhtpd590ng3eewb5pxjakcnhc78bmsiaqmj64thb7567h4brzi7x6ea3x03a74rgqiifjdi9moo1hlmq28bytjqx0tyepypbzomnlpb8sgh7s6ir7qwkanzri3exmuoznkj95g4sm8snu0wfbs3r6kvbflmqnpqxyaxupq7jvgxb6r4m827hv1tdse58wrhg1'
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
    
    
}
