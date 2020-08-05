import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '018a3b12-9c05-4969-a7e2-b3803f3b9697'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a378e56d-a253-42da-8b53-5001a44cb842'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'dvyb4378w04giwci2acbgg389c60s9st3kak8w58i5lhhyh1q0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '043cj2oo7ct0boe47a0m'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b37a9d52-5811-472b-9416-ae0b76751e0c'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'hyvntai1z63k7cpg84a36lv718vavs6v0xoz18clu6odl3q2xhoipvgl8qf809g6weybvo823gzwilnewt2pbf9yj1rquwegv1n7yu6nwwhgct7s1k7vq93aarxcsoonatrlgovlih19c3z78hee900kohxl70ez3tamqqfp6t7ejf2ji3j4jxhzq9nrpigwqb895m1c1zedr2lcvdrkupzodxowqdxzb1q1bv4y3th8t9xebd0qrv44la3ipk2'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '94yfwfwjqiagbpv8wrcdr3qo31pvapbvhk6n9ko0u9reh16hll0osh4rkmn0sp3ozcuvld0v59n7d1lpck1uevjkdhwetn09256ol7c8fef0lxihjc37hz0a7ru7sj3724up3ruthcqjmm9eyk69xtfadjtyz82om85i2el138qajehnln7yovw1n6jo7ud5hrm2wokecenkjgujyknb1he4q2ted5zin5ajbpomiw16jmatorioxui7xqj37gx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'e97xmyt2ivk1plpyp350bp4ngxvbs6gu56plknll5mqb4fh6jmiy3frh0388pjygase3kycqiqz3cagk6s7rpnn9tu9o99p7tp8c9fpc0nb2u47odybebaf2qzsnl6mcvs10kpzdfqfot2d0njjeyyraezfztmcod6w7u0t479vbjvelamr4giet5m4miiai8jtnq38p8ru00p3lk17tjd8qy1fokdbdhpo3ngf5an40ow8nopzh8vm33ylyolo'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '3ijc7ovwzr8jrfw2ckxkft0t0a47wn7sebdq8od3cy563tu59d482y1t58ocmwd4xln3ozyi2ireqk6gtx0dyluztb0ljs7jzoiky4f96ip96m0y9t9kwie7'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'gbgodg1923wjbbbt8s1nbj5soretj9wb3ci9bh44069mki9s8q0pwuq1o9b0'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '9mktpyeftb1pdsbwlj1uf3wa9chyoht0edtueo2la55amgi0ij8havfu0y1ofv8shf6hzfbf423p1iqwjauaws7unreog4bispqg3xvfcthuhcxozornnv48hnep1zb9ijvdjd2jjofi700h3z2wfl78acvam75wdweveajcb1agiv33bx0ro65uhzgdej1ldqophbjbj10dezjd9iebwdfs9ike7tqctawfbgtrxxs4m9tnzbezuvb8l6bgu1k'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
