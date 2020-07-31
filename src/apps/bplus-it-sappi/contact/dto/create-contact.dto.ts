import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
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
        example     : 'riqvwhcxmarx8anj8xpk0st5aoicp76i860zfxnlnhgfikxrk2'
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
        example     : 'btp8hkrowvzqtrzij37f'
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
        example     : 'qnzpuag5o6t8gty5wunvrqafk9e43mkzghibpg9di3yf7r8gsbxc3dszs6nfej64x1a3dg25kgso1h7kp5rt8xc7kv5hnn62ur4lv3x9g3u0t3af4srr0dh5l9sy91myh4aqug5gvcw5094m6gqqutlbcnyu3v59io7kul30us56gn156p3w0ft5co1g63z0w7cpzf05s5jx1lwxhakqm5nxt126j835lw7qwm8tvwtejw7a09r4xzllbrnttwx'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1qwkzdworm45emnqe1z510flkw7957irp50tu2g9mqiqogrlmh2c3w25ossnhycmq63ss0itw69hrudinlfj5wfuuib6nu4mnsjpxg46f70y3s6xxv4c5aj5mp0pjhk8rylyfbncxi253spqkop93pivjj5h6tcuxbt4ijqu9vjhbck2eoluveffcobie7qran4toq6aaiuq4r15t5wfvfy4fxli0eb440rfcte12k6hjx7to4b55s0n0i3nj4h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cygap4yd82st1gtd4ew74orlskjpp6ndncwg2upyk8pstsbanmvc8cp4vymfepcgy3g5pcdj0lpsfvxezxskp4dajrhwj14hkd4cr4k1n020qniri327mn5pkwsgz8gesm3dpe4g3wqfkvdtla42zbc0r7mhefbr4tuax02vwwarrl8701itmep4un3ix1acumcrf1yvykri8okf3hesh8pti00ap2hxk42hutqs10yb19bxj1sm5uhfxzleaot'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'dzu2tvm9culw3zzjvmtqktxeju2hr0ghc2jp3tqaazqkj38jclq4ufhz6x514ydsfopeeckvowptt7nb7smdvnoqoakbce7g1axky8yr159kbds0suxfh08a'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '6nlwcd4hnrdi3dmgs2942hhsz593hox8l8jthbtwdybb0x0ad2qml5ao4h3y'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'f2o7q5gtk8p1yah4zgc5m9b8ubvvz8sgn7bd03rwuxyyivsi2540w58yvxvmywqvv60mclq20iaudmjl9ypgvg1fgynmi4s2rak55ilyvtkq5tzclwn90gtrmbcre66szjpqdkint20uoc3ez6pjlub0kcck8nqp70d2f4vydmm6gn59q1fjrp8gg59ipsy9p00pkauqfd2m38b0ettvqwuz4whkyvhgw53sj8ga7ekpz03wc5ez8110k7pqugo'
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
        example     : false
    })
    isActive: boolean;
    
    
}
