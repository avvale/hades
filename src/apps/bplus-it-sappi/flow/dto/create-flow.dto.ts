import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7370121f-7db7-4db1-8d18-f949b51bebe3'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c13e8197-55c4-4a60-b7d3-5061e48f7a56'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6334b1ff-77ac-4635-b471-fbe50e95e21d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2yy4pk8r7uwvne1ccjlq'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '52v201q2f0zzncyarbjjzczowua1p7fe1o98kcrpd8jtsin1055fkbn4vgl0'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'l0fve3bm964ou0u70j1s5khyxk47twrfp63tg1mx0nwv0vy2my3i4jexztlpo43ad0p0evzqqk6f12ofigmu0er79x26ua703a5df8dc6x600061gaxkahulcrxf29sev2iv4k41cog53u1wvmp3kzc2c23gv444'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '6s1luk2ocjnhuf7wmj7urymarr0lwx03exuu5cxw4nc27gwvyn2xosm6ces09eojxvwgn48cjc8mk24czn2zgff7uqwcx6lr7lats402yk62g02ejikk8qku3jwgymogaoy4qxp34kg68fqy9rgbso1mnmaylvbv'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'fpsu00ks4jndi16v8dvsl9qgxvfja35v065iz3kn2xaz5iwnhf5j1hrazks9ts9dqjsc2ju6knkbwoks6wtpwvajnzya1uu5abku9fva2qitd7gynnzf2xsgedepbrr5aff96l9j4h8rc2k77ic9huivtj89a9w3'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '67wura7fozssnp69rznwbij0xd4b2b1r7uh5l00qhhdxz599nfyyriuay0id1efmofte4d5rwvgngwvt6e5q2fyf531xwj42ordx6hmf2j92r2tjb2iecsc6n4wr25i05ovogzjwq2gui0ly8m0ohb74sj73s15s'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'oohw74kpwz1cbiv9g2nyf89z4u3sqazwvshjbx17h3ozwmdbk1u52g4hblbam1dzey8yj340vij2uw3v0oqe2zsrmyfu0ljaftyfgmc99uban6l4z05mz00gibbf6f4pjlz8i44fjgsli9igocxb2aufojn3t7n7'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ozmadrc1ksayk8szgp8o'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'y05c9xmmnhpzv3q87n80'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 18:28:18'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'wpoku4ee10wyhmo085qh2ec0sno1b57etsf71t1ewxk827nwfy54yood2pj32kdj8nkpuphx3skn80eodg78nnsnx8sc3otmojddfdr99tmemn9307b0u5pzzq3jazu5kuh5fcqysxb5ma4m4udu0gp30u8f4ficbug3xrm9owhij72rotrzffrveins89bzq3dt4nn8zk2aijol4tt05jthj8ff5yp6vivbb1x44l7g0yr21hb5rvjzni1j5p1'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'zhwpmsvi3hnslppy8odm1gcppo9fxsz4qe56v76a7a9kakp04cl9e0rxggcd56127l44fz7wwq5kg8oth91n1l665ccne0e1yhbn0v4f1e71qn1z4vf9k964wuc5cxhe088nih6okjcxydzzghr2exrpzwybs3po49gnz1p04y5wyz0hsfmn1bflr4vd03f53wcs6enwgw69a8e87mm62t7slduwm75bnydiy0athmhivihzcxwb8w25fmrq4jh'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'g9uz1pn1npsuyhn5chr7po89b5fcy6eum4mzz7u7ktnxzxqkulpcl1fwvabo'
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
        example     : 'eb72687d-b23d-43f2-af77-153dbbb6f19d'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
