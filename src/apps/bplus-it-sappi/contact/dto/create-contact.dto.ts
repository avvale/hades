import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7c448cfa-3408-4102-9d45-ce46cbfc8ab1'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '56504540-1964-434b-871f-afa892eb0e69'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'diyj12qsfujhyn33l24a'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'a14dd912-d135-49fe-b50d-0cfeea373155'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'tip07uepl8qevfdoja4zq64fv1b9ybovasb1ycrsxqbw98hj96drl51ob7x99x96cvqtuyp0dlhm09xp8vyax98zzdx1jfiv62pk1hkyyew5ye0v3t4oo7ijyxt3jwnswy0uha3b143gs8lokw013u4ymp7ttju5wewnljeo9bbfd0ur7ze0gf9e20buzglrinu530vrijqa7nqnbd6fer36y2nkqfhzkkga74tys2u1jx3e3l72uot6zurhrwb'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5iyn5njusmwyqvuaomj83gxzbjcbo78vkkdhnalnazfh67459uzqsdhs6ahf7iuz89zhws1e0ywuyjgglzopxpnjhhp2g1lrwc0guew6cfchgzyhtxabpu1xwt0tqqe109nkgzpr72j9cdwgr1mvhnahip0setownnvc6ze7mtrb6s1m4pycjt6bfju1duyaskgrrk394n5sjteg6xxxu0k5vywipaz9qrcygbfu4d6zykf8eapj3eytad0x0iu'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'iydd5p2j115ny6y4p6n118jeovrymdl28e3pesxnw8xsxp9j5xca4oel13mu3isg5dm7uao8bw573d5v6ciidx7atcyknzmds5gwr2hk4gtzj1i2nx6ur5vjxg9d4urrkq42042td2vikjkxm7hb63fwveb8kmaa0uyiyncz2e7pmlypt83pqt1sueh7ljfpv5gpadke3rzyezdxp4asuiuos086v3xwck3gu01qgrp1k6blynnimmp6r1rgfgb'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '86kfv0xsdws8vkaoz001fl1e8d9ozxciuuuehnkbilipsub9jgkt9unuy3x3svskfj7xozx043p2hpx0weovb7mgo9za910cvo7sio5n1t5hfe16dr36mrnt'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'vdvs3x7zzi4y5sct9073rykmw516okrq69x939k2gmcsmg1rujzhqz43xo85'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '4k76sfibgpft69jhqil2d4vpsxmbab29q14u82670uitj7150okb8g1j3zu68qzcu9wwl13itoexoqrjl782p864motnn7mg28t8b2gis4gy825gfox5l8t41j8rslouyqe8nueq3kzmfpbxljmat3eag3o9b0muyliet0mzon4e9ikv4itlwa38aqbqjnxj84k30wrsi95ia0x8t68406v6892hmlvak8u1zct473gut7ktt8terqsiju8gi5y'
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
        example     : false
    })
    isActive: boolean;
    
}
