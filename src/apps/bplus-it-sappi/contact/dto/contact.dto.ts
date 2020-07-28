import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'af06e73a-a913-4312-868b-9aefef33dc29'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b741d8e2-973c-4e89-88c3-ada737c839ca'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uxukk70cbs9c4i9tw008dbm0u6tqu1cgx0xs81fxwy8zelvwj5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '083426f0-6fac-44f3-8805-43894eab80e1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'skb8ciqpptyryyy2l43a'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '360a5cd6-ab91-40df-a0ea-9a99a91260f5'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'iv5agwwa1n2ycwc40h1qb3bf501ltxu64yb9zi1hyqk5jxctky35zn8u6g04zr13vqwsjusnko5oklyjlj5nzaoh28fizc418bnc1m91hnii4cpnek632tr5bx2lxo41pvjytwtoa0haal84nz8apjqfmhkjkfm6lrn60168nv06flru5dye89eof9gwqou8h48lzi5aasusmpssxkcb2k403aittbpmy69j5ofmprb0ga29tm64t8ekttl3snn'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'h2bbykoxkexcgvntr2qhnltf1u1p9e4no82l221wacg885jfb1b1ocsxszctwnbjaslz54qw0nxun3z5o9yhkwr31ujsfcg6pfxnss61fc8b184i117o0aooyth9ui91aiy93le9sopkj9lon16prnycgtre2yqxewstybcmmmhmg1cupm2eli9qteoyn76ie8j7ic04gz62h2zolqax8twosfybbh93cmmktmrv1n70aavkgcf46278g1ca0nb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'h88m1nhh4kdctvdoi5h38d8os76jr063f65vv3iuwaad55znv82qows8bs5way5l747lmvhikb56iy75qipvpn654zc22qlb4qkrq0m80xe9z62mhyqqydstto3f9log55xvr4fqemyl5m22m8rypf3ydecyt2rh32v31azrvoql3khrzq5tjrzmku5bfubu806g366ocprbnotugvw9xhml35ei4dl1sxrh9xuw16ylh5lhkldiekw5kdy05pt'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '4fewtgqptxbwuf6lsu82pycjm1ebf8i0nhpuobp2j4kaxnptp796n1y3oo6xw0z4fbrj41g48ko1kj2l8fcs1jplezvj4mk2dqwr4vhe8s69p79wa5y8yz9v'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'gdg0nf5399up2amb0zictvs748gvgxr73wemapwupndl6ku63r1fxlk77q8o'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'u19xkhggw5szdo4nxjabih52a0j3f0vo1spkqb4h1dnwmg8ql9qd3z6cx9r86ns1ri6xsaq30zmtgq1b1h60zr5s6a5g9lqdq2senlx8p9ff9n0scr9z32amhsx5x2czb7jcuj8cwsbkxhcivqml7w84e4pqk8dsofkglu3cjizoubhs8jg6qwfdwdpcqoa4zr30mm9gqflfg4bz4ari1opvolzl39num9q3gnme4c6wpnme3qyw83c138bxad0'
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
        example     : '2020-07-28 05:46:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 18:04:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 02:55:34'
    })
    deletedAt: string;
    
    
}
