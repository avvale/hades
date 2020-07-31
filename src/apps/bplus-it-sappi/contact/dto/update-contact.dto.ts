import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm0p81487kz69a874vian0vpqjy83xjiy6a2eoqgo5er3ezetae'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1a53f617-42a6-472b-90bd-1510f149f1d6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ogbfv4k68til3r6cs63h'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'oyh7jhkbvnj655os1jq2yjsoku0b83b6po6acsg5ax2u827j8wv3twg5ru84u2d9pncnjqyfqs9nz94fk0mlyp3v4yrxdkn0pf3w47ex6wsksbz9pcxbbgp3x0f5nqp919t3bbzw5e6ybr68i7m0wn4vpod6wa097b9o6nh35d60l6r31q7hz37jka4bv9wp5tkicred8gjbdg7ou15q8u7xcwybidm6tqq76121tg3in8ubeocryy3h0x47gy3'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '723we1tc9tt0vlwqgcf2jou2jze03rwnizyl4jo0nwbr3v2ia56wx94htl71fdwqw4gn1adxzyl3jhhorwk9s7i5ckow612md8dslwhxu17jgo4ric6u4f6x7i0l7wc23ivagte17rfgvtmr2vwqrgxv7vdvjmnktmja1dp0t5id385jwpvtyz8d952shf8nhpft32x6mhjlqxkysgz0m5a04g1ms85gvbsoagzapwezxyz1r0wfuitjwep6bll'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'sii4qw6h2b6ysn0t3yzkar57mqvjxqiod87nasf22fosj8bqmhw4nx8q2ub16mzx0slqqatep03wgpamjwulhurhk6lbq5pcana611jbc98vwn3nfye3etg1c8gi2h3faneswoaon7yey5b3sz0j0td1iaj3gfyeh7t1srhcotg422su9yv3e2bhctnjo9tj4h3tb8uwbrzqgldswqocjh7nqt2rc0bq7e19zqfh2npjiv0fobk2951a57aloa4'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'awb35g7mblpfb50cv7uofamqow9bg2h7mif7kw7oxtwwd2aw16j36mm4xikjnpsaj9wtuz666xfusu3leqrwt5yr23ejegqyuyhgxvddl3uvag35fk9sirjs'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 's4qt9sxjutmfhnp8zpeeohoi3qix1rg4nd7iwgi410fi8eldp0dddkb6p0x9'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'faji3ogiti40bihmuxta3xkka39m16kyuwhciihnsof7hnpwm793cpp14mld4qi2y7veyf10t2olzt8lveob6dj4gfr1pdrxbom3oo86r4e54qmdlb83c5da5hbox6jb6stchm6n6pr7wtfx0ll2hr1kjzxjknu8vja5kyf3x3rqnpfevq1p2q65db31ag14jlgpjyzeq2w1y7vssrw8ez3rdhbe232jyzkvwmbx55qja8k2e0645yuixfr88dx'
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
