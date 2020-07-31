import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ugi357sd2vh348b97d1yxy45cvvr53cz1v1f9sl6'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '62puqpp7f6tzc6g9zuhgggqhu0cw48n4wnp4tr2mh39km5h4yu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7ebcfeb6-6479-47f8-9051-506ae6d3872a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '15bhvuvjuhv86n5rsb5p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ru5i1bg91rk8xz89rfcq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6h1r3y4si9mionxy7jpo3vcf2cbcq2jb5qepdoa5p02yhqy16r5ua0dhrudp'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'a1bakq2ivx6g1txvs0k3prpierr2wevlqa7m1xvns8mchlsbt537jouz3iswzntyvop9hgr9qq8uekn7krass876bz13m0kvuhag4c46f7vk0cz401g3r5ug906tpxkvn9wz010np8wfwg5bfd9v2kwj31yzney7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'o5zxf643dhl4sk4gkil2ct7epqg9arspvsa2m82w6b5xcergc1sgyup1nyn601e261yck58ijxlmv3bdj6v2kksvpr4jazow5kgl8zdckxqmf5w88ixl2qnnshjfkcvbc63zlbmp4ggizoeeksvnhehk2l0y8qv6'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'j62o6i169oxhl9e37218c61t1kcuqpsdcs3w8rd1322yxnvnojxd8802tv9qjt93gkgxa8kwjmu23v3rnaog5xj15bopaog5qxpau8201qlhy37nidu1jyxdvy0jsdoakhp6lynp9wp2lh7hjlgoyeul7h0e1qvl'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '9ajincl6e3j5jp5and8pafm8wdfl7iojf7y2ungmgwv1p5fp9n9y98yhq1hg3t7dxmq1iz8vn9u16p73myr4c59ibbzqypu3k2ehkqhhm0brtnw2w0v6rh0vo83t3ix1kom9k63mbkdtym4ki4a6d09ijgmpi4ti'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '0qo269rxtb7dzuudbb0e3p6cr29bgvfwkvf29rsv678gok1xvwc8fa84yus1pimidvfkfghqcruh75twn0vhn06ibic6l5gx93ysdkmby2kdg9kh3p10u1lzi8a3qyykb0w6yxmd7p209k5g1q4hlv8uims8bup3'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'er2obzxxe5v1uzn7b09v'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'sv6a6u7eaetr26mb19gl'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-31 00:31:24'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '59fgugm4cp6rflwzokrfvzufcln6z8qghe71rpgq5iokh8ptmrkexkqqme68fvwuskx4ul1jpzu0iior7wtis928a6y7dsh1es934h21yrgrolzj61fhxlmopffxy0s3r5x83oguemixc3wo3onuh5401fg0fpkzwxbhke4gyeh70n6alesmhpytkzg077f8eqhh0lsbpvwlihsglx7gknevkeavhx1kmsmcj3hzcmrp3ddo26118krt2ccjkev'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'hlwfpcmkplag10k1dcrgzipmwlqyghpprl63e1a7um83y0kzdtsplwb5ih94caszmhnt3nkdp5k0cy88k893a3sue28j26v9qak99zqcq8j8ew769pca2qjox6ti5dq8h9oifijj7k1koxv3tpbvk56v0tsra4ey03hl0s76pdu0fjjbb15r1npqpzdrvbkfrbe97bq6xv5y2gzqypziw7gz3mx8qp2bsddia6zromlek7pn9x8r0hk38qur792'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'z22d1uzf8937fdba5hrsxsillb35zknlwlmrwiop1r63d4m5t39ytljpdebb'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '106d932f-8e63-4b49-a441-13aec0deee54'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-31 08:35:55'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 11:51:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-31 12:02:35'
    })
    deletedAt: string;
    
    
}
