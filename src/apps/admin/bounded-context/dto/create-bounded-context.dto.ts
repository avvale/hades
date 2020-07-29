import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e98b198c-a3bc-469c-be1c-451001d6adf2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '68fxb5zrmw6c9htny91k2ici792u4sm7pzpighfdc7uyhqd8si84yomo1x5kcauwd6xgcvj0b6n1pwdgcg40w1io614zai279gih6bu9i4274efeu2ruit85bhd7o7jpi11gftpeiifvju6yu527h577g59wo7lzhyd3jjwiqsccc3qiiknmxd1td7rcw84prksj39wmkxnw9wde2yr49e6kgcm91i4vka1nzqv2w26yvxrp5nrxak1ah20bz0n'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '58ki187p32mo9ysoh9a9'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 397547
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
