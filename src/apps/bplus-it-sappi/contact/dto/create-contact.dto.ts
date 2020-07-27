import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2bc95a65-aad0-4b66-9718-ef4317b25191'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'cdbjjp5oksxczafsumm8rj1vnvhdlio5svhvrvjkig8q94mh17'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ca953a6a-5b43-4b17-99f8-a4e13377109d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'chbta44frkh0opb6uvgx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '4d8fec59-fb28-4990-af9a-9027981e1424'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'q0644tc9tcsrnesfrq5ugfv1ddt26c4hijnts04yjk0akfpfpwrsu729rew3gl1nl1yoimoff63iown8yrf04hodqpg35sq3bb8usr0nksst0xdcww078zhunomf326zia4hx11i8ssz5rv5dy7w8bkobfz9kwbil2ht4mg1ojiimhhpmhq35lfhzctgdfhl40hw6nu14gsozj3zk3ob96l61bmkpysga1u1p3lj7qrt68m9jkf3lcqoseaa6hu'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'um5ex1fdt3oumg5b8r9v73vy52yfp7olidfm9wx162r8vzjzwu38yldm45ecp5hor30mkwjh4ijt6th6d48d3odbtyt7hduhjquvow3u5vksf18r179j7evhktur6vivk4e3i13fy1vnqsyb8ywi8dbylry5gu4vngeusg2duoqm56xntigg0ls58ficr4q5gwsep5ojr4f9hg95d37bvwqymld781dwgftrvtb5s23e35hhctqer7mbbdai5nq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'mypyg101gw34fkwz21jbfvd1h583ov81ne5pnwy7hcke49mvukwg5lhstj5gjz13s4ldypmogddh3k975fj20kpnphc9d3pkmsfnu18c4peojtggravb21axd0vxxmhtw6s97juokorf19przccyfyd7xrw213t7ib2q5qpupj5wulg1u7dihowkr7gpa8a6ss483joskwv9xhpi4m2ajznqk84oey41e4vvbayox04zr1nq7rwlqitpmwfrriv'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '7xop9gf972esjbsvgrd7y8umhtyti9tbs85ztx72h4r59e0wrbo3zqsb2boazq0jzoeirde1vvsw3hf6nblu6pzgmr2rl3m7073c3r4cp4o6ah3yt8yilrif'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '6hjv7xpl9jooj1tthbcyk7h4a26rykd8qwkyc5fdcbgk2orb2e85afq6bow2'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '55ec52pvfqcfdvz71bs1ljkxe3cdv3eiv2c2ezklh0hyezrle7gymd2g8o0mzz5ylqu28wnebk5gu3dbcjv4xby5bsbjb114mwil6csrz3qez92kvnuzynf03as26go750u0vnuc3a8qia45zw4v2rshwnru9ek7ol19lls2gysp8hl2ihffhbiconxu15g7rbjtnid25xpa7zdpz8606lmp6dvw2ua7iknakjonru88i85ys2nsoju12lmpsky'
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
