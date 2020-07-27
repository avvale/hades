import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4867cd6e-c455-45b4-930d-ad6eb256d8a1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'y2p6vh1ojlpz4ou5jbigx91f3481luewoexwo2qt821jl3h07o'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '485fc9f4-8687-4102-8431-b9d71015d8be'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'y4mlkkndh7sf1ilogc3c'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'c8fauapeqw2habt8snuv'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '8drqg0la3y8b5smj8lx2rtadermtimbg9mqwguktz0sugi2obbwyabfq2m7k'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pajc28tpb20h9gd4cvqlybbnrgl6kkqcflhtinnj24s0yaku4iis9p6u5b9y7nd2hlv0191epb7ibk2zdbiepe8bb4izj5yn8wlfn3dokt2m7b6hq35ff2i6yxmgc46khyuhkse9j2hrxo4a0evqwxdzhe9414so'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '5xx5x1gq80ocpzpwd7jl2k3xb4vgplf82v06mekc3gmkm598v192f68hp6la9sg31r4ujswf7jqpitrfabbmvn4kpmqcieonwfdqxd0blful42oixnmruqrr0hv66qgl7vevjlg5gd5q07lz3ma11gmuuf11uf4r'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'utabmepy09vqirdlqy16vhfx9czcx0li0emudzcnj4fhmbebp4v9j7tvm5mfs92ulimeyyyz82nlu2scjadmobyt15c6mt16svy7oxz4va7sgg21kw1cglkqqxlo6x47q0smwvjr4xd2r6oe4nnywslyuwhb75iq'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '0rdoajgw5hgxfzze0t43bi7ag1gt5hrvqjxrdyyng5nlfuvaxuqdmkalhbrqmxthl8bzfip2h3crlzfb75ygvgkji0imj7m2369x5qq73fthg3y30yiruimcceaf8mubr8vfpunvrg9w1ewe5plzcba2vyvyi0xb'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'ti975q9i4javvpo6vcdr8qvcikvs10ry055zhrup043r3xsltzarpjevxjng63jw9v646s8zpf1t1242x3060tb6hxuaq12hbjdfft55omxew6ejffos0cypgc7emba3yo15r202f9boqugp1qo5nzmzo5oqi20s'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'b2vimuxdrdw435t5j6nj'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ciirjq1g98is5yoqadh4'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 10:37:38'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'y8q1fga65j2bx03atck8994svp9206rz7bg8jwdm2x8bjycm2trj3qp94sqhovi2gekwg6bsj425ovohamqg0p7cad7sapvtqfjhajs9odjkqxib8rtqvmqw6zpnq7a8a1lxtv4d9khaypeg0j1ba5qfgwbh0xcd2msnm62qasqv4wuzx3ihes5be8nj3xurmocqd4zafndc0j87715rrw0m2789uyvem2t85f59y1zwqsskmrerer8io4pwtn8'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'zlbeqg1p5mpkx2hul51zti0k3n1au3vomwrifeincuv9ehkywvaapf67ci28xgbm6y0xr80imuksawtj20us8o44uy2savpbpylivhzxypesm0d3z3xfcoiyqhb3in753q8o9mbb9ef48hojbemoi1no43x2wd3yjfxg0nh8swu8kb2izvvs0nmav2vod9m4sk2nuuxsshmm76jlpjs5fvxnhye51sb0wolglaa8cjpqlv8f9yj1v5ijs63zimp'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ked9rbiflnr9xwd5uey0bqqhoomlsxbj12ffyy11eb4b9mkpml2lgabd9xb3'
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
        example     : 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
