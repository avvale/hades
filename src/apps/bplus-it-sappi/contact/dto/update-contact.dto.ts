import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jvbaz2shy1q07fmltpn7zlruo4sez4guaa5vfjz27ka5z4d464'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b8434f9-32e4-4756-ba37-051cd033ffd7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'd57nm28qfki2zc17m46x'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'ec22b292-1be8-4b46-a044-dc1ed4370eca'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'a5aeb8304z7apyxcumyooesqazrqdxfasgk4oupm4mdycv6l8xvuqi0hqsl4ohirl4c751gvf4idepzp4xs5hf5e2jzktpp0w5qf254wx973kd53dugq32ni23delb1lyobhgrwy2rgnc7ywcali3ysucimqo2wv77bstjr4bl7so9zc11qxin1eqplkxnhr3hd14xuysnxu4c6v8p7h8de8dpvs7hun75n42y6pt95xjg4ynz5cmffpfslqqtn'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'itnhkt5fnsk9mkgz1l0ea77qmtib2oect5qzalctb30pi5sx1btx7gr63zo7mzoakry388z2ym3v9ul7inchoj7mlrjqia3so6sxf0t8ho4brlfnu0rhz1eds5shahqqi307u23iwq2rh5gyt7i1hsun59irscksuba1yv22m2xkxiq1hnctxlugm5f0ue5vwgqpjw1nm7t4u9wmlq11s4e2jglc7z7zu3o0o7hb3kc1ny4sh3ekfuumk1rhoio'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '787otwrj5fqb1akv79ebija0b7m2oe5t74q66nxajii75zlpf9tscb3a9v1vxlc5emef1lvlpy862my1tfdak6tus91laj9y0povk1igdlkqr7dcwmq1x1f1pz8ndt06fogq5519z2s9cbm6w5jn6l7xvq8vnqkqstnw2rm6zlub4d5c9w6v6ebrcquv556fbbafvwmo0govrzst7ldgw5tkct2qhw6mm0gcp5g211i8t1s56gubdhf004ymv6u'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'utd5jfam9jlxo8ud5r5plajvnb3r550t1x5xiocdxqt5lkrpvyvosvad4x451gm78j4bkmuk3pzp4ndzsj4pywvc1izkpp2u4cq7t7u9qdm2zxwnbux4sq4j'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'fqxfoyu0syit3sot7my36afj0momn5vpae35f5m6a9o1yy8uxu5jxdhlekgh'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'jhn8gia620tqwccul1fxebjcexj1lv6j4rkos3q7rsve2iu8vmxx2awp2ocu2n92a22q7bgpispjulucrpzq28v3cwa91aiz9t2iruye9br5vtwcu81nh0ohk1tyep5v621594onkfgtqltry8o8qu03qv1gwevtrlu5vz51fmefbvzgl13pnvsaxc51axbgwwz2vt7kdox9z1ipycs2y958a8sr1wanrve8v3que4qcxlp7wxemqlonh8nvc0z'
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
