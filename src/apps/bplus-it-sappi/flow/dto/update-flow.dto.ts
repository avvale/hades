import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '04c09944-d525-41dd-ab5b-11b7e2fb184d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '741590e0-20a2-400e-afbc-c02fa05e8e2d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9lbf5159vxprk43p5j4hp7pmdchiu7vj4klpxxpuw7gx6rv562'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'nvpbhvzg39k1lk4i8obf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e8d8cc3-d973-4074-953b-8eb40d3ec026'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nlsdqzxqw66n0w0tbh18'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'r0rqzwmkqcgapsjd9ioi1h6za79v043d2qvtdhnhujrtfe1wzhe1hpsz6fdt'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'mipcfb8kzvgcrx9ueje88q4dhd0xnz30q1q07hwlx6bvt59ri0kecimwb2eyvysd8zhmh9phfg1x6q43gtlgf0wllmp5vjhuc5lc6yg5qckh5ea5hdmqt0rh9mji22zth3ipul2juit9mrujvuqbqclxmkai37oe'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ibeukhyw1gh24v9exhinbopzaz50ke11j85e9gu57qh1bjwwmio2abm8q9bnubvhfctxi5jt90vkf4rmzvxpn624zancfjiyrtb33l00lz4cj631rxkbvmul92irfixl0fbfmctqwmktvj3g49sbivf1crumumg1'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'uq0wlcwvqpty9w1o41e3t4esnrrlpeuii9u22wjj5qxj5h0caxgpvxf82eyobuqye3jiecv6in1yyhsxtctr072i803pgp79on8v5qpn50csns6sdoy49nt7j97s4c74xkp9l5zgzosqk376vln6qw6xmxguouk3'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ax12vrxvft9yn8g3k26mh2jup1myplpa1nnfjouo9qmitzacnamo84yo0v2pdpklneicdklrfq248fejmbyrwl7wpy1lpbnrlo0mioyfj9zg47vsa42qyaklmc1zt9m0pu2t016l91md53jqdjcsj1dcs5haek24'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'iodguqsu23mu29t81kldcciqpnacoux97qf5ar2js60gatgv2t8p9vaq721i5brwvkqxxt77rop560i8ts4xbo8j84c8gkyiy7x3mudu1h0kgfe1tughxhxpdqu95jfh4797ndxp8k7musddteosmr453pjw8y23'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'dh3buhk7w3vk97jzi2s0'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'a4gzfzmfa8n8uzvjv0k8'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 15:41:26'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '9ifyjb83s4ieb74dzow0ildzlbag1lvnuztgpi7rzx1cly23un6wr5sy5726opw7tgqej2jquspwcp9v7szzu23e5aiasw2ucm2o41iuu81puwbf7doqg3va9pvg032n3544s2luzry1d5hc29jvr2gk93z0gmisdy4awuh4d7o56vncjicyy00oecsdmapt9g15kmt3uh8c2rv091aq1vuow9tvjpviqlluji5a2k0rmw2epd8p4mh736bysum'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '3xu25nmqveyh2d8o2j1fl8rckz4qx3blt854cystpf98obz3n26qtcgbx9be90kwob3f410yj84pe1covafc4g1fydjlex94hf2yfkga5qr5os33i3l5wkcq7eyvic3aampnn2kg8ieqjv7rzrpqhzppaghi74vbiflv6go4zg1y83ryslyexmmql866qr5q0htfj202mhjxbr6gx4wrr5mp43bezxehw96ep69rmhwmrug6qiyh507w7aglmuo'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'fff018ykr4ggq0wqk4bxsdyal2yyi66ieg1k7xncj8sc2q0o8bd5r3bkxylo'
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
        example     : '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
