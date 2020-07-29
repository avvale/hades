import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'geatdt9nophrui34mgc64tiia2zx4jaqb5nt81oq'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48132ca9-66fd-4019-b9dd-620337ddbe56'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vibx1rhkc86g6l6azlz7kc3ecbnbb6x603zziw5lp0j3eibarb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f98b30fe-06f8-460f-bff1-8d567c29fedd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5guss5zer23vyja1890n'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'uegm850e1knjxogm1az0'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '8l03hmeyzcju6ywr7cawtl4emwd3jbvxugj9huudvtifzw617nl6hx0psvmw'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'yxkgbzguvduj3hmx0haehj0a7dp1kafvg74cq5mlw6xs93bbz96e0rnlgdicc6wkpndxbjp22ch02wf430bgzkw3ewtz0y642e340de7bjt6xn9hqtpkcsvz97rwrqz2lz70tk05fu3z7o7tovoablzms3vvmgxy'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2jcv3z1avf2w3tsbon3hvg6jz627qrsajg3o4edpnoq1cqr6q03cu0vrec8jqcpt827332l5s9mi4k2t1s725iq1nf3a9owru6nafdc8s7kyc66yiuy077humh5kl7ihytjwz95wkxssjc0nkmmmbdqwhl2mg3xn'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'aiz9oep1bfx7ncrhhvdlzotj8wcunb2ghhytirsbn3fd0laqtwpk9gxxim9c0vamaelulmdcj4leonwv8iqn5itlmqypi6r9q2j42vd58gns7tzgkzfq738hnfwohedli5u7d54l2yx7l6nso9swr0vtwsj2j2fx'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '03wdy5z9ymlsvsypuhlgo78yuqlk9y2ut4adwcol746wkobxmxsw6hwnp7dn2bm8coqk1f0gcj3qulidymbr72h3qpfg35b3pa8lwwlxm17ugrs8gmjubiczn46jtzyhfuihf06gydynh3t1vbft3njm8prpuls9'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'oh8q7qkb8qkxvnh1zsiq921lve3k3yt4o6yazv25s4rpbfxyzzzck53e15p6da4odhuwub38po4nyytv3npabikde4nyvgb0928jkxy0b78gogjgtxkfcv3ghjsm92lumj6jhym00ci4gz3li9echocmllnr5ym0'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'uy54026uz7cl0fvvz07m'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'akmhy46d4cnirlnjrz2i'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 12:50:21'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '194djnw7yc0k47onf2ja0tylzkuz3vp3vu935ti54jp58k12k997vj6lgruckdihkexgf1s5e708pmqqr1kwm8annj1ysrxcaj02o1ltzu2ptljy0crhjo0qsnnmpd4ge97hv4b83050t292wx447r1tofdbep63tqjrxhu8t460997f301qw1cla2ozja3swsvk4uj5yn1gk5hft8hbdm8bzf9uj0g0840ysighbtq4q39htzhlbnnwwh0mk99'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'kb8swu7af9ct8gn9w06t62hxtjuxore1i04v95sfnc3fxgm1sb39dtve6c5au52ckzlvxgmn79hkip6itemk7gsttf1o9dn86y710f4a48u949cstsuoomkp5widsck9yzwwfrbagdad539lxsew8o5xhqhrqdyxn577o9kmhuvwlya5mf0tok18hk1vj197t4fhjikxsb3io63ykdapz7qghf8yo7pibfx4g3bcawhr51iax1999pvb89pkcbt'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'qopu0y4kua9hcrkplla5gwmsl0a04nk42we2uqbbvh32piky8w4lm27hfecd'
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
        example     : '0bec15a5-9dc4-4383-b536-3fa9e4446819'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
