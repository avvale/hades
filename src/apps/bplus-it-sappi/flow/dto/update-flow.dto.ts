import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'b8bg9xnrcg05mmxkun7ixxv70l0rm2vkb6v1my0v'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c9f4327d-1e85-4dff-80d6-f566e5e1f272'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'q907amp3uyegwp7hd0f9wsl4ajn6kao3bt4qhmavfwao31gq0j'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f141849-f618-493d-97ae-909e79b3c0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ubbfw9lggregfdq8wi9p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'nljejvmtm6j54nk070zh'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'v0klds8q4yxp0d8o1w6pa8vvd2z6nh15118p2rfu7otfpl212kifb30ovje8'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'fqsdseb05yzssyexmuepftv4lom3wfcdpteoq0kgucpgbw318mpuqr0d2hurjti2y71dvgzkyt3jeuyji281uw9zxhovxcslzlg57eweebc69hg8wt4grmh2kyyvw28kf7w83y1zehi6e0d3gssifg2by1bbablf'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '7annj0bnffiwnd2aduptje1dtxowcgn2kbtg7ykggqo5obxkumezlsbrtlb8g9w3br85b2way0zrnhy62d4gtb0fe4ehir6n1mdnavren31ogngdxqrefykliusivezq8y1jhe9elfp5fa49gi7e5x8bpef6lciz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'gcuwb5nadw85mslu0vk56lpiahmmn3q64hade0pqjhrklo4qt7cn15e2vgtdt2qajb52916vdzf7ncpvcb6un582v6mjur3b7cmujzl4ivwiv0b33bs8ydrcmok2v5m120pvo1u7demtkq4laxwp3yx5ff7t9er1'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'tusvacpd0li449u52b5igq5uue1slr601721jy2bz5b9ki2zxak4qnlnfnjk42fa0e6r4thcf91y9x4un3zlg3qxu0p43djzmk7zl7izd6z6ojjkdrkj6ff2jm3zgd4fmdikpkky8pl72t5y7c9bsb40plzwakot'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'xvt2aum22i289sj4nrt1esi20u73a4ezlymkk1ml3y29pi82v45qm4s2st8pk6u2eqtkbi8lwgvpmjevd82mgxow6blsds7uveoyfnc6zqdwuoy12tt98qjeaptq4oc7m322j0pvmix4jhbhand8zhsb8f4t59yz'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '1kjljt61nj8cosmsro89'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ahenlqi2t36303sd47ks'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 08:28:23'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'j6f2ru3cw9hbjpjqeruil20k2caf5jjtxye33pto80v6ov50r6ykqb7i9td6y2gqh2pyld6taqr25mewjf6ee50cdledtynemqfhygfomeyr8hd2jy2s7odsegc27gw8rin15814y0uy0ulwyfl4zl7gvhn77ick9h2lkihfd7uxekvfog2ptvwpm31j16e4pcxkeqlcwqt2b1vhrvgztvi34qya00xsov0z5izz0jop9ti285pg5dnv1ezwsyp'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'cydtfi3x5upar1hf9jna8nw9oy4aluz44bc55y6ab0a877kl9qw3nkk4jg1h3e194n1c81t9sf6casi3sjm2qqkdl3hqhl1q9n23otwg63b3ktkbwcx2qiblmih11pjrrze5g02gh4l05qqpbqk38vd4sxrhxhhksqn3enewwv8auuzj4h9ulabvmba5q466aciqkpi3bmv67xn73v24tmca32l912c1v7c7ehctfkkpr9n46tiu63i8oz672j6'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'xu1ojzm31hn9e15oo14r0edzkl0iaz1vp071qvliq88kcpexoouzlqti9pms'
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
        example     : '61d7c7e5-118c-4aa3-8a94-562c0805e506'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
