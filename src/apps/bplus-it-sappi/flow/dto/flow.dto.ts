import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './../../../bplus-it-sappi/contact/dto/contact.dto';    

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '89c5ff48-29a3-4258-874e-72884d6f1c4e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'dng8mjl3d54e7tw2mokm',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'fk8zm443m5bywz8pw5ngxcskg1dxslezpo3ynbwypefajztzrj8ijlyb6naa',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'z17pcfr1eps8g6g5sdqd8g575myfdgmsri4tjqhizaxsb9q8v1ke0uh4mt70dyn38k487bs5vza96zpl91s8fgdjpfstxjf36wkov55fxwm215e138wk1qfsxglg2kk9srsin05dxzlpgkrzhf5umbifgemyguib',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'duje3j99ii7becfgdna8g8m7fkzn5bgpa9asblac3zske1f76442aa7blli62jkke3obz2g2l1kbieutq2xzgc1bm7552djv5r03p0htlewz1whaz7fw3u3sko1l7ax4l6isdghzzsa8o545djr7y3z2oyvqsc1h',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 's39l6nhzew3c8jbj2r9y62irv613h1du32sqnigpehjlpshyewd9veh1h4e7gajvqs8ppijq2wfnbz7aonah801t0l1tpnev62il9443ztenc1dmrupp7fv8gkc15bn1m6y0qghk6qdvgrr8f8tmdiigu7txbhdl',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'zyb2tq4xcmdvuo5gppw65h55w2ztohkrvg9tl4701n47v59j9nh4zpvhqjj81sahbi0opcf4ed2xttxnr6i5y6jy87r5bxzpqri72z4lr3i7fz25sbzb33y7bdcck81e2xdssaan9qoot9pmxu38dz2fmi4xv48f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'jln6t5s804tg28x3g5ywze2h3nfo4w7qjhqz032eqkm59dgbopp26jbi40qt9fowxdlbhj55lnsyvdbj25peet4rxam9mqdten51wf0x1dvz4mj1x6ua56hf0qzvvejahqjrk4y4rehy76kwmu6jxbcnb4drb0bw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'pa84riy7qk3cqu9ht1yg',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'vkdvliulrvlvjo0c0arj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 21:38:23',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'chorkw3kh6m6d0n8s12q13rn3h13ofcqtkl0norajvasplkyk88pkcopz89job8e5q5syzltt32j3gfiomd02ynvjdhdulj6931fu5btfkz39wc3qn93uqb6znlkcfe4fizwncv7bt53gz78akbsi1eriwixdys7avjpbsgutjvndr6pxvsipxxyq5z58epdd411pknt67odpgmk4uzwptn34pjsaonwlcf4rm2ayx2qqdiznq64ac0tk9nhi5c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '1orokgcueq8v8i88mswkwj160hxymg8gbr3vaqqj2ox1xv6zcn1ducvs7fvtstvtpv53yppfwqvafha7qm51smrz2pvl85dnzabi0sydl1cibmde3t1o0j98y32uy20eisfvwzabphw9ke40n9h99hqk2f410hxzczicd0kuv0uyavoiljx4qe2hzmbh237fcehaxv0wts4gbr8ludd2ur8qkbk2qmitxgw77vm3fmnlkpkmo7k9zmxwdvdawiy',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'l3xqhh2itlycdoeqweew8p9higdu764f3ge5n9q5wtgs2pdq14rk2ikczocv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [ContactDto],
        description : 'contactsIdId [input here api field description]',
        example     : '',
    })
    contactsIdId: ContactDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 22:02:19',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-06 05:48:15',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 12:07:30',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
