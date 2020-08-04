import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8ed95fdc-7532-46cb-8408-181368cecfb0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm7b1fkelvae6e6e1kf3c9je94lqeb4i9xka8bh3ccz1s950zxx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ae9efb0e-650a-456e-b39a-8cba2399fe51'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xub2akdwi3tflry68tp3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'e8893008-dcc4-4e54-a094-09b2287d20e6'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '81g6uk0087fcidf9s57rodl0qh5t5cz3g9cppqjyvcrwyzj8obusq4sui43jynz9lkyvpcie5l2ku2hsoyojvbael6rvaoa5g133misst8e25adkdywiq2m4djg1j3e0yo5t2nmajjf7d9gjy9l2fjdwt8g42514md6vksilzpvlp6f3nnlzxldcyq0nmnqwoyh21cg84kxi2v2uboexm2z77r2q8s5sxfji8pa26fw1icevjr1jggzvm89qnq7'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6r348t301azpr7vm3ljqhbrm0zkftspzoq6gc9y2h2fvmr1t4q6m9tanvlfq9adc85odguo9ajq3t7i9y4m9jndch3ju7tdleqqrm8he9gxl06urvu8hb3pdqlpg24abs2tbs71p5sgr50kw6oyj7w7wlcm22rdr15adalv6vy4r2j1v0oeb89hg01vr9q4z6u72fo884rvv48xjtpkp40q630sp39h8ldr7urs3j1x77vikic63v7e7k7llnd5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'q1vrliwnd865malt35x33rum3ve7ciytlba3dndf5d26gcrbsd5bcqp07gqp980140zhlgrmkdrp1gceylzy7nyh537zjo7eljg7xjepek2d49buh0q33n2ih1hg414l3vsye0mgjf9ddxgagxjxp5sdgd3laau52qsdq2cm9tonmmmcvyki3gbh0k9emwpkf36rp6ja6qk9mlaazj7cqb84ao6u2n0v18c98g07jmb2jb0nrwdxo0j22nhxmwe'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '80eoe8w3nt6vjpviz88n31va6egxc12oyuzpwg39yod1y7cpdg0x01wwhzrzglivtcjexa8ko217nr67vtik7uoqknlk0l01lv6dh5621d90tuv5uj2t9t7x'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'fosqdzukctb2aqwsm0z61bsozddf332vamt8d1ta21a8ku2cgp0wd6vrs42r'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'uarg6ldcpdmwdw2jy7vj15vbd5xvle9g6w3tqrxevs15sl8bwr9fiihhgjkgaf8t820ytvacb7igl2ivck64zgok0i5j5p66pwg64jlucxt7iguwzyc0i3cele31ahoiky9p2e3ixupcnmgngfs3r4pdezpvqqxoog5v5atqn479almag8pzprsyevsr9btbw8i9ajl3v35f0ii46jpe6l1aynm5wu8615nioveis6xrdjes9y0evvu5pjogzco'
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
