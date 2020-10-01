import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6a01c0a5-1c4a-4c4b-a257-d538b623f6ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '737f1fc9-71b2-4500-94b0-67b85709c5be'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'k6had5hrdsoqtcmzxld9rq61wvq6skawwmgdjcje7lj53mlqv5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bb0e9463-fcca-4a97-ad43-69c9bff72f21'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5wforjyh6bjdnpormqfd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '3ff20a4c-8f91-4b8b-acf5-afcf2b0ede21'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'i0vkn0jvv0lquwjvwyu3hjeyhr4jexvbl0vll6620qp2eqqk6imjh53ws7lxquj0dhu1f3rz6wiwb45v9scr0dbarpcbq65fcj3bkbw0l3i0b7qy4qdibrztcstxu3f5oqp0ijp9v0kz6q300mkrqjx573g876p9ta86x40prptv8go9jr7mhpxer0m8dubuyn3l5hwkxndybmxvhgn17hf6hwk257okc8rpg6dmd3eegg8mtcipa34odtd7uag'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uyi5l8gts3xz2i6uafqj8axi240qodoqx40dkw57kcz4epsc5uruqqugs9m7biooazxj1h4enb5arkfi2iwj2zop8r47tdehfikaxra58diwmmnluvth5wjty6ic52v63wp3ls028ywvqufknlcmposls19fkeyqcu8d3di6jjvk3lgannu2fjv44720vq4yb3zor5w5ita0z20h1tn03fu679cyn58rv6ncef4djgh3lqaw3k04i48twg67jna'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'wncceh3i14a668aovpgbp9lhgmko1cepndr2s7i4buf2xhe1ks3fsvs320wr9grb85yebsyw76i60igwwdp8hzdg2eutjeyzroazu84cg7urcmmtf8dr8sp3rgfe67sp2j3muusgl1gecnima1dxi011aa3pbcol4jfu3525mheezu8upb1ad9k708o8lwezrpb2qbao0zbnimg86dtr02ma4yhgm3ey59pp3dlsukbyh2lq776fntbp3vrkclh'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'lq8x3iyg7ec7dlyb5ycvg4ln0km8wcl0bn9wtvm99ddh0gq35d8l1w41nqcvkyjuna2n7cdnca7b5u7khifoxy3eus8fm9zbh2pj0wms5jiq56p6ksliklht'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '8rwt6v486y29yc123rpnnuz9equ2ofyp4k95rap77yqvsqyj2rj65a7qc6ip'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '3cnd4r34lk1itmhtvyinwt0vjbny031vct9fbt3iqlaj99r7n6p9076gwy2zfdpfyt3ihzqeqwe9322hweih6hmxrbi6hvpncnhtd4b1juix46tgsi2lotmxzv4jvbpd0igbw3jl32tescd89wfzxdpd6ag060vw3utvsam9t0is91hezz39ewnlg3foseu1q3i6pnh8odpvzs15o6kbk91emtwxcl5cdbplarkjngu8aoiqoevmcrkxnn70zu0'
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
