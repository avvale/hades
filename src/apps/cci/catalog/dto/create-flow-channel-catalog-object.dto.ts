import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowChannelCatalogObjectDto 
{   
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 't02tzizdta5hif4a3k7l6vv6qg94o42cj3r9bpu8rdt9xd9u8eworyujvp5o3o1jpuror0ngq08ka57cixbw8250s3mbw8urwq6hdn303895ewstvuzj5hghv3z3qloqslru0fpjeammknml6x00yax5i9twz41g'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4q816xj30kr241q2zcpbo4ogj478ex2glg7ghs8jd55yq65h5zoter563ty8e5mi9tbj9j12x31n62xv45gtks4xf9dl28i8csj5bfm8h0a66cz97txbe20uw546nvm5f2zyd0098oqwy5r7czvy4r4uvxk8oyxe'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6s3wnje70dnzwhyxfcvgp4ywuq0ou4wq10hyy7cnu3pzbegzes5wd6qubz9yq4i2zu2jdtfs2uc94lf2ys4ohdb2luao6mtzoj5csnn5qg5ec98y9x1hix4j8yq40vd4rzvu60cnstxdtxb84t1cn4o5rhftlp5i'
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '0mzk46z6q8f3j41940mbxnqela6z4dkolcrghk0aikrb1cv5lck382hr923xt0t8jde4gtt7kn6d886uhyadqlddvemx8yrelda457d59gb7tpgkpfcr3dtcwbuxstvv3tsqcduns0ee7ryrh5cujwj752bxflb0'
    })
    riInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : '2m34y6uwt38e7z8sdoog1ntqeidgbs3cwlx2b2iiftwcciw01t3l35q419rxe4qza7zs664jwbusgommgylyi33iuulw33ogmwitc1vmy5dqns40bc01h8b3ejb9q9w8vcwhiw9nqfky0h4v2dfweoehf4ih4tbe'
    })
    riInterfaceNamespace: string;
}
