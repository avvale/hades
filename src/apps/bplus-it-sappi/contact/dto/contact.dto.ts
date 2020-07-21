import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2186eac0-4963-4b7c-a768-4dc9c97286a4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bea95f09-4110-4ade-a8c8-97cede034565'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6ui6cmfsuhgdtswy1mj6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '5j5s6o1s7njncudurfw6mnag0zwrpswga9e8cgt1wygln115rzovz743c5mnhchs5atvodeg49cbetbypotqvylncwwg6ppap2tf434p6c57nvcbf9dl6a6igimjdjxwdp31gpqua8sbikggaid0ttwtoa9zzaa33cx4s1uzqyjf8hcma0oasenfiptzx5mu5nhoppmvdslsouikzif89v65qap7nwfdne5d6vmackvvwt7cmp26emujm5fzmmx'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kkrexf6pdu1bdjemaqykthglgsbq83anvzroda6c8jdxchzcor2obpyghaboxjnnaskd2hcqza26j18ckthsk12ozfzjqy85z3cpd03a5lv8pbylb2bxel2e7n3aob4f0dirjr5qjvtg4togfachx987pb47v7v0o5r1d3piy0paguvdn5096xg7dn6fg34bdc049mujpsfr5obcgsc00wyxkdghwvhmrwtu2i1z8kf0inldjmzkz92qck9ch9y'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'q03wlmlwjxvbre5y0j1rbg4tql1dbq6enfmffgamfszpz2pmpsn3nm2v2oc8xyd9pqa5n1fsgk8qovvy2datuneowrl4zucl7a2k1o56vf2cu9w1qm5n7tav09xpe3bk8s2yarq4g70nb46br14loyglrc2dqx5x4kht76980avqwg3aum9ifubkvr6u2l42skop5i635txp5vmj4stewa1sddvyts4mz039gs2035rtgn7engwvhpgehjuv2h9'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'ucilo7a45ij6gnuvxc1vept1napthvflgnyhnfidl2cehz2rbn5dmxcbvl0s24septp2ahhtg28gkcb4zxeus8zb1bqscnxhm09ijc3jtfv5iig7d0tecja2'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'x3haw9eqb51kgtf85f8hfh8jgawo8hiu31gvqcls3htlwu3h257e45j00jni'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '6n3czmi532q70mm0r3h1pyvoeyx0pj4nb3uejqp49wu7i021jh3rnjnhtsvcha23gcyz6h7i4tshxli17f5373bh0vpr1ppkospshna7pv23dnv2wz8ye2kmuyyvmi3yi9who713kkh7jlnda77l5lix84ogz7g74bgt70qomzbzfux7djizpjgmnnrzti7eqw5ti0ecyrfyrg0s7qv0ab3i3hneplp5gu3735djqp5r2rmaxklnj7d10876erc'
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
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 09:19:12'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 08:40:01'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 12:35:43'
    })
    deletedAt: string;
    
    
}
