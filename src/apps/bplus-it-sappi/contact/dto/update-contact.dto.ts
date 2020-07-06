import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93a48a94-53c9-4509-bef4-dc81f8af7be7'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'byeia1h5780dxj0gqowj'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'p7aff43c3ajiql4tsqn4v09h94qn7cjgy2nimykn5u3ahbm165l7rklg4ae7da59839s9a8qarap5mtk92hu95rp6m31e2gkr344mbjlindejdkmhbjcruddm75ka3n6v3ynnhevlcyboown8dqnu0yl0e879nseit2438cr1flphxwl5v3l0il7gk3wbzcd3u7usxan1pvl40w0smxmp34gtstx7csvyc5ajtbkw9j3xd4u4397r0wg3aa8gct'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y5pg6v2laesdzb7ck3xkg8qi9gq467y763kxdojeb4qg6qjorxffwd90722rqppzdbvfb6efx2v6bwzkvvq0p5cupo4ka1vuqumrfybjv1xpcpl0n1j4enygedmle1w179e35fs4nzdq2fjf3zyihfhq72h4pov77nc7xas67fw5nt8w59q1kmnwwich9vjv694y6no0wqflkxm95n035c1130zhx8blqh2gx1ntifexa0fk8kgaw5q1f1qy33s'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cmj04ofvlpaszh03yww7w9o2yro1tsb034mw1jgau6z673h5tzx77z9q0kad7y5czfsnk0o36jngltwrrb6cpzl1thjwoszlz4arupril5ktg37pda16jbkqezbkpdi0qawyd463ijqrs3994kq062z1avzjcv0mdibuek7uzv8s0558i6k0tgqn1t12t7p11emnscsyhnofccb95cd6y2w21kpwxzjllhulcmlspv0kc8v4i3uj9x1fb9wyuqq'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'x4dgchjt07bptkpl0xqx9hvhcd1v9h9ur3f02inh6t8xjzuc30lpzc0rlwgdio05szc2irg64bm6mjzhgy4fx5v5diaodl0ps9kvziln5r8kww8t513g9cba'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'h3dvyjvdqgsqj0r7onhgnzg8no4a0shfjd83xaienk20wifrnbgqcybujm45'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '4x1xfmyapbunvpygg29ggzr5ajuubgpsrcxmvu9hmn8p52ho83c1c6vts9cx0kjk8dn4jntix6hn7wnqivs91jcb3sepswb289i8115hio32ty9fz0008nl65v7q9lcp516ly0ccqndk2e6g1r00j2q02bldp89lgldbr7os50guvm92ee997x1npk4xptk4kdy05n2hhhmiep96gsg1ikguv5vfkpsr9dfhtldasphttekodpdlnzp7i918ycr'
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
        example     : true
    })
    hasConsentMobile: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : [String],
        description : 'flowsId [input here api field description]',
        example     : []
    })
    flowsId: string[];
    
}
