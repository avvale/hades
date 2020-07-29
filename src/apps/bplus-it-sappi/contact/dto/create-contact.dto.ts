import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4t736zups4riyh9u512tk2uyhg33nu8d3ry99nnb3p0cjaovhz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3a2e6498-b3e5-4590-8ee4-b694a6cfb284'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4kt61373k5nnhx036274'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '9632430d-9630-4357-ac9b-af4802e29e63'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '2tafj1hmmhs7gr4lvebkfj1zrmjq3fh2bznzxrnt93fl1s3x0g935z85nz2cy938ij3g8ujilijhj0ofzvuyrpxmz56d8ffadfctdwq6u7c4vqzifpvca343mm2wz3yy3rvseeoa8sjtihgmc0cgdpssaef2igb8w8lkruskd19wux1bgdyhbzj0afzsexo1hxdq9ksvsxmplujd4zet47cd127c6yoyrja1699c1188e6olri1fm31msxqvv5t'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i58xjkke3cjimhbq52sgskezuuaw9vjrsjtq4aeq9xwu2vupsdjyvzttrz0ztboj391rtqi421gmct1k7gzz8rk5lo2l7bpy45oytrrjnvk9q21lovgv4q7skt8etrwdqpdiufddgljky964nb5ip74mhurhhyxc5t698pguy1szo2d5o1fsw1fw8cx5zry3co490t9f186awr9x6zj8sd6aazynvf53sv9n1k6icnqbtcnfhr3xppzf3teoiwv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'p8e1ol1aeor1p0e6zwlo2v2uy9v9tpdraeonheim8dp0izuel0h6ocxzx3ny56af5729fpet75vak55s61nnqj0cjmlb9wtndmsr6holknz7wzoprmds7brj5cnfe68drtdpg6aaavziiu01rpnlvfqfw4euznr16c0x1r9ov96glcf01cd8fwbnw7v2edk84vvz53ezv42uh789wb4ulnr8y83jz2ftq79r7uxt2jzh66iu0f6g4ilnrafwtfp'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'o5ygvvljwjo931e4sxygq625x5zb5nfgpx32yfhbinfh4ne53zdmactuk0un0jffb4ylfjouaa3wmkqw9eascs44awqokszoi8talo69vl9uz1zfdru88ww3'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'f6jjaj9a2lxq8lsfnqhu2gxczgytam3nbyspj1pipu39nujq2ykp78fxb85e'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'xpf8473jicalze1jzxigr37qa54eb5m08rqzxidpizfexqajszt2fmk2jqyh4omaaadre3g6hr4uzuaq6nk9wnwmiof21qphvdup89uyg13jhdvlbd2i0oumiaq92xj48lzwuc5j1su06dc9sh37oq5eisf0ibb21ok7bh8g5mixojkdv9z5kvh22305ywytx11v1ztouki030egu5re5keuv2moymh68tmbn6z68vxnit9pvyb5o71dyhz4hp1'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
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
