import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'tsb2lpb8h1kvjpj1em4aa2p719j35taeywm6jxda'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xgppf1fel3y10djvwwa0fkm83v57i1gni55jwn6m9u6s9jem77'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4a20b716-d5ba-4ee2-80de-084afd7cf1cf'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fxr2f59pbyzt73mh7lts'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'oz5x0urhlbzfy10l0nta'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4dq249ke5fbrfcth7p1l33ejprlzhiwy8r8qntrcqzipl3vthr2q5qoby42y'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1o6ty6dhsyf4zk3y5kq81dptt1zbct39ia7zj1yanru4ao4e1mqh9tmdtvb6ixpdwg4afoic0n4vluwhqjlsugbfxxhqgjo0d3oaveeudwftippxm2n4wlctivun5aygyu24va34g7da8i5dcfvjzp5y458zf006'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'epj8a92kb2hpqezwh5xzzs8lwzt3087wjr4qwios0i956v0bl3f09z82r8w4aha176xxtresiuxhxxojvlssrxm1ijk0luq0o5rm4j993xlfo6iobffmduwfth9mhuk582yfndcd3flkdhabitijo03dfuryv631'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'aqe8phu5yb3h1htanikupq10gxe1mmhekfc33w2xq1cbl6gz9rinqsbxu0zeu9r1ivuh9bitdwhbwmivd4hqtxq3wpkq0ckx7b1maun3c37x35aooachzbn9cy5fzp9ox7l3tvoi90poxydarcg36pr28p9j00y8'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '1idwwiqir6yzagjff8i1qjzhjdxatl5i08fwo4ycdnhsttymthsds3b3twbq0gd26tnvqwg1mimv2j299uyduz9jhxf8s9prtjouwzz5yj5m73pz84wi3sn1ymio3sukjcf08j6e6ofausibyoduzjlrejbfkxmz'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'wtlpi1wk2ckeq5ag7yi0egknm2s8hwvxp0fxz1zknu3il6ba5z83i6z2y6w3yasr86rkhg96dar5m4upwqvwvzq0irckvykiabowax78a3h3j3gr676fo6an0vxhr3ilau4poedekvjg6l6ttu3zwihfonmgxxkm'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'mlevdtdl7jxx1ictjmo7'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '6mn1fetkw3595x9ek3ae'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 12:58:22'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '1gfgdhqhlsuq71yhur6y5qa712iinlgd4nv99lskj2hxuzafgczbykaoztiuwmk19vvk39qn8madzwaoovtp41hbo0f2gpcrbladiqy4h7wmmduq1eoyly7a2cju7hojjnfvw5al8tlt5mzjef87u7xurpcspvoox83u8hyf7qu7s3741qs4i2jg0ot314i0rx2i0jehhpcp76prhgaphirm075aixeaamnem0fvatbfdisgk3wdq92nqd1gke3'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '5ufhk33efxu8r7ha20s5shw6p3ftxm1p92yx7b7oz3ez4mki2lhgr6uw3chz3hn3yuebd91np3vjq1erety5yfdzblyx3y6sjvv4dimskous6t17qfqpyzs3wsxj08esgkx4qjb1molyiofd49ywooqq1w0prfex7o9i3mi3wwpssin4dvjii9uz7idrvbjczmbv81ck08lhu5wg5q57d1v8xujaedzxfz6eentmyidlqujq3m6zdiuc1h4f298'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'shw37rec14lba09dc86p9g0s5j8y2njg9dujzrr3ns3ksi3ypzu28f2g2501'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
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
        example     : '6c55ada4-0e8a-461a-a2b1-63847e5befb2'
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
        example     : '2020-08-04 06:13:38'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 22:28:41'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 04:05:05'
    })
    deletedAt: string;
    
    
}
