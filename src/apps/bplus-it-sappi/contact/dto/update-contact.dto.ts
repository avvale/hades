import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
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
        example     : '0j6nwoxmxug4kw0phyuj5yh0sv50pd56myars2e0uyepmw5dlw'
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
        example     : '5oeaaa3k1vfqlb6dzbtc'
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
        example     : '0st8jffdszdr1b9qg1b7qmuuou6gqygqjp5tw2c1inkya857a1000oplren93ec92vkv2gceyjd3dmljo4u9aknfcx57mgys1zeupg891wpxoc6saaa1xuhha8u4jnsyrjopkh8f3a7eucafyb5l4kd0vsr5t1q3236091zvy3u70vvj68ojnamy08c8yehiu0br0r1tk8zelm1jqm50qxl13c72zf0iplj2ben4d7avpwt3n18gjwkg1xivdpb'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '20f2u9q6rkcr7zop8ex167cia9fajgy9qqvac2wuegzhob5clmy2px55op8st6ykx3cc3w2ja4wz1ps7tctdzj1f8p8szm4mcqlnnuwsbhe3xf2l3cuzbyeit09sqn68pexj05f5r9kkzk3nft3w13tn06tgf88zde3tdcdipeqv0uy1yb2iq0devyvlfymzd4pid5q0oc5qkrojuxtlcb0z0oamyy36btb1ogv0574ubgdu8y918eysdjnh1sv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'e9o7m4jaiayyd8ogxkrr2f1j9m3hz9usodk7fk1719st47rs90gn6u4kslo5cd3f5w4m33tq3nkg5y515rci40dxxxnvs5eb619auy3kmsw8r73jy40as3kv675e7293dk0chh9wxwzvjfuchrc09pxs3xu1iaw3t7xzjrp4vlq4x8jkm1hx1ong32fx7ad1n1gku68wnlcip2hhv1y8275k4o6ima22cfy9ss4n12fz9donw865pt03h7dnafl'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'ggx8jvazybgx7gq8a74jka5kvtf3j7hscr5hpba0xjbno709najch38n6deihavxwbngfm6ij95dwun07k388uyyclyiakqe415mxh5r31qmya0tjuuv6ljx'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ux0gmtavac09bbml0loaoekt1oj0mstapwbba90u1dr19aklvhq8mrbubtlu'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'wkmw52bz4gycy7m5yunn5furhsrlfnuumwtfadbl3wlvczfouvkv2534twofgpfnji8qfjatp9xb5m4el014p780xxixatb5jmd1n299542c8vjvaz69bmtzm8dg53kvloi5cvyu1ilo7359qz8wi549280ondkr9jn9t5pbqh7du126u306x4b3qkr1ahjg1qse71tgh3foyrupj423of0g9nkuyuwjjl4x77jcjfwtdo7qz9fbwvvki1fmf2h'
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
