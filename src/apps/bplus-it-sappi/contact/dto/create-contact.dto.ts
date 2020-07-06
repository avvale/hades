import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
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
        example     : 'lc67a692kosxbya1gcor'
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
        example     : 'fbu8corjz5tqp6zl3zx69wr1h84k3x46c7kqlrr6kzn5nir7vdpjq438w43c899pye6fikfl75jtyowtk4fxnjq2v1i8u375ns79jyobi8q5zvp1hgkgm1saa8i7pod0itb8lumz1f1y0ri8v5tn5catnbyn8oz4oyb3c1fsi4zda3d4cdszrzbimm5ohdi2i3lqy31m26ds93konloqq2gudh4ys0x6i6r2v3hqkgy4oqamsu32bmbk2xan1r8'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'awkh7jtlr9i2gw7d7ozj13rqfklz3qgzwf5ybvieb4g8n2ot8gqbntub3gbq2befi88l8z6xt3s57w8i0rwmg6w6xcyxmeo6ek08zv5pvimm4fsis58s0odkeotbgcdx4ryglr8dlxk0aaonhe05hw0zkj9d74ia399ou0ib5dbx2lr54d8kdop28f403ormmsa6r6odvb9jbjrav1waziavwp41gzj0j8pbdronoy7fvciqfdyv08e8gxsokjb'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ak2xyosnybme2zmk2xhypep5s0vf0o1ia4442kzsaekf42gcbswdc2lcwlvug7l3xy8a531hb17jwlj271z9xmpqx363ypwjrhn95421ym1wlqizvbbwau3h5qy7dhdek9dqd4jhfoh7r03j7tord4g7avtd0htq6mbcjr3ndabacz7ogdcargses9iy5ucq3csina87nxdxemf05ofvzguvama9czgv6xftv8ece5y8jdvl3478r1zyjj9firw'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '5txz2xd5q68m0h2l5yp28mh0hojewtpw7cwngbtbm50c8ave5dxqznejpco90gox3c8dc694pne7oylxi1di6k48yu3kz79nlhmi1xbft3nyozma70l6l86k'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'kwfgfxnxdccrunjdz34m891i6duraajvw422qo4fbwxj9e3rn4z813lh14k4'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '721tfbng6ot9sols23s0a0zhrabl8p900udcueak7gye4yn6icr0mtu0pao5czsgkoy43mr0b5awei48m0x4i6i81wmgusdn8i4xh2f9btbvf8xgcadm32y9md9tablbgblv1o2l40znjxzyfmigpydg180s9thgjj6y7p9uepeewuxx25dfeirk5ywlan1aj72nsijy4zqz3h2iy1c0amfhq2fq7ygg15jepqm4gfy7pp6fzcf1mypzieh97vv'
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
        example     : true
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : [String],
        description : 'flowsId [input here api field description]',
        example     : []
    })
    flowsId: string[];
    
}
