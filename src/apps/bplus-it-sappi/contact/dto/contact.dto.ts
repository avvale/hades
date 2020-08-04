import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8ed95fdc-7532-46cb-8408-181368cecfb0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'agacgjn91exsk8fmqinyvqzkq2lo2dvybmhh84le89qij6gu9j'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ae9efb0e-650a-456e-b39a-8cba2399fe51'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wjth44j3jrp27jno8gpx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'e8893008-dcc4-4e54-a094-09b2287d20e6'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'dfcatw9crwopahqzr6v4org8afjku09kbjxzy3h99oq1j64cpf9uu6pm490375rluqwv1arh2t6oymi25jfh5t9zdl03pqkf3obm6amqkt365tahwez71dkqx5i4jz8wu8b9htl4rea4fg12e2epj6garx9dqs7vkfd1cr6r7wn5yz2v4y6hp1x3ulog1calpjasiudqxcps54ilow79vsnjto9kegtyod4zpsyyrsvckmofs1odwnaf0epgcsx'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8hmnnyehrhwlgtx8u5h12foqlpljbtayy3av7v0qzswmpd4kqlomnkbnzpqg55vdqho9qrq1dowialusm5f20kl93c17wfvp2m8p1v497wgb78uszedyspmft5vdfqksidjt7vqq7wl1x39xh2x75oa12e2rilbkg89vho4wzpb00tisci7mhwuh0ly30egvs7uk4jq81hxo5p2kwtiteix4yw0fo0ykxaxp6ox0lp6999so2wo53yye20z2n7n'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '0o32k8cgq2vsnluehnk8malywcsczs51z3y5iw8pkod5ox3120dm8p2kjjjtad22yzcqw46rr8rnoycuajbvpr296s7ip2avtabboeunxaxwuswwgbhoiraqry7af5s4gcu447d1cnmvcosr6z5cw4pxwppxc2jf961bmwc0grbgyxx0dffy86a1n5et2ba9kv9m3w4oerq32g0xonnwb675yk1l3xzwe5myjq6pb3058suwva3hafwnphbluqg'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '60id7ic47876si02cnensgt03jxas29iurv9sp66sg2okyc68avuygoh4oj7ub03u03jykyvj6tut672a0i3d1vk80tz8ml6201tuqlgzts264mi48i4nwas'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'kwn9w615jgqrlihzfvgp7rg2j882nn6ggtw1sw1kg4i226anh4shjizxrf8x'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '5ihgf07h9e6syxpjyldnk6sjykmpbuwswhmida4zf2jdi6h7keqe7w1174dtwedn6at63rdd1x3t06lc6v4w30o7i1gtn2wtiixwv838fubb3ddopax3w6z5e1987kb2xpp1hqrq4ts3jl0do98iti9g79z5xubfz1padg5hefhfx4pckxgeegcqhn7sjopyke3us2hg897gsc4y3i5tgzn5u7ara53fp1cdm0jay5feqic7xv5fs7zo8i4u7jj'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 14:26:12'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 03:56:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 16:03:15'
    })
    deletedAt: string;
    
    
}
