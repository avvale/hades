import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0cb0483c-8a7d-4378-b026-f78949422144'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'fgrm2jte1rcjrmdwb0fvtc9l2qnbfy9lf40ecmny'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c7e37d86-9aa6-4fb2-afd0-df883496803f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nqbdpzmem2bjve4oc2ywlww60pu3ns992uc2i80b7iw3gu5p51'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1847fd8c-663a-4a25-9186-564787c9cdb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'snamk6jloy27v2s2qbpk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'anro92c1fkw23qphe1n6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'tnaexftosxghv1hi20arum56mob8gimp7c6jjhhf65cz0n3k8ltuphocenfo'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '23ojdsba202l08v8rlmofk0vs42bnlgs4cjxdb3uow6xbb4fnanr9meyplyo8wkk4tjrkm02x2yny76crno299gdkc17qejeq2aqyq9fm5gbn3dz57mchftccaigrbbstddnokzh8puc63tcdvjuah8fwnr1tzpm'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ewsi56j970o4l48q41o0asi5nxh39hcl3lk18f4lirfpye3tnukz2myc57zxu68h5358hw3vyytc10bsg6uiouuzmsephmwdzjhtlh6btcntux4sdoci2cmlr6y4qv4rz1wtryn8vjlg0vmaatdchdsdlx85dqe0'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'reoppxf4w7oow2rb5dlmqncj370mfkcvfafilv23lvwkref0vimvw1hv5uwcaa7kkpz2qtsxvyfrfc9z1zycsyr5s3ixnekjon1wb8dleejple3y02nqjf0w28xaq0a4dyjra97hmrg3bw25iv75x4wcwjrrysh8'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '92ap7o7wt2fhaqhgc7e71bq8afbbaz0r3hrdma4nzwtg3w43vk597jcgoa3rqtwcxm8ssg6e0ej8kip780ivost8bztg37gqkmo3sjlv711qm6t0psn1slctotufr4fqfaqmwbq82ez4k38j2i8rn3a7bgrqag0s'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'lo8dzn9u4dz511mhdyp7tsr53ljvkvc8pam4tuwhd3v9idd0je3h2o8j98km4kq1b42chj8nvku1krtgs7kmpyypiigz8d08k2bi6xm2irk770bf18yzizn57dwhq1jxmgif6q9tpakqqowwd82hc74upnj0af5t'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ocyzulaxy1bw9hnoohj6'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'djnb7n06logk30ix1a7w'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 17:05:55'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'a0vsc35fhm0ytb1yy3swxkdclgmw4xy3vq505y8e3iteuwm7exreosiog33847ob758814b2yq26a95kqwdtetrhpcfnmo24qv79231wr4f1bd5pzqc3ks40ecb4mk60r08jbzthv0aw35k8uiiexvezczbscwh1eshtsdn5vi8p4ofkjm8rwzd4khodr7ajjim4txluaniwxmqlv33447j8zeci7660l50wijkrt32okaty8im9hla08gb6kd1'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'gnmvrbowz2vtsn0lwfogvx9dtuhg99aohexuf9nrdk8z06t3sq2fobpbn50oz7wvymi7heddf6ub7u23qym1i2gwg27g0bdxkbq0yvarlr67hmwx6qclvurkk197v9n8bn6tr1ni1psznim7uydj2097ohgufge83kniirnf94f4qz32te24w4d3xgsvam84jcinpzjro5fesfnis0k5jzzhz38xjmcbxmeltjcjptru80f6uyy3k1u1ezjpxyb'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'pvsfr218v3jp72vy9zn17gvvhppq2z6w6yywlpficr5x5qspx87j9vtjpwva'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 13:43:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 02:50:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 22:58:47'
    })
    deletedAt: string;
    
    
}
