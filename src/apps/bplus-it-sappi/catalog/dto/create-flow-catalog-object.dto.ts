import { ApiProperty } from '@nestjs/swagger';
import { CreateFlowChannelCatalogObjectDto } from './create-flow-channel-catalog-object.dto';

export class CreateFlowCatalogObjectDto 
{   
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0szj33u307e6ev1qxx0y'
    })
    version: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'iq09tfow73iknn460ixr5mvtac3ef7ez8fmv8ciozu4kzqet07sv3naxwmzu'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'cyecrqweoqlcl1amxao66gy267506n91lnv3chwrsiabej55pn1mhw4iieth97m2876gtwdn8ld726kbfu6shvbw9qpomhw0fi9m1nfywt2tks0jc0vxddf9svxjngevnuttl63kq7rovwqiiirw7233tzfouum4'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'glu2q7cjga8ue2ng0md5avs0tthb9rsqhd0vbbrr1k7wgx1eet490yoxlqyhnib83dktuu60xbc6xkk5la0m1j3evriew9ztrpopegzspx84tewbcikt6j78nsqwh7pz1r3egcce0eknx4iluclz8zfz2sf69kl5'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '0mzk46z6q8f3j41940mbxnqela6z4dkolcrghk0aikrb1cv5lck382hr923xt0t8jde4gtt7kn6d886uhyadqlddvemx8yrelda457d59gb7tpgkpfcr3dtcwbuxstvv3tsqcduns0ee7ryrh5cujwj752bxflb0'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '2m34y6uwt38e7z8sdoog1ntqeidgbs3cwlx2b2iiftwcciw01t3l35q419rxe4qza7zs664jwbusgommgylyi33iuulw33ogmwitc1vmy5dqns40bc01h8b3ejb9q9w8vcwhiw9nqfky0h4v2dfweoehf4ih4tbe'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'vmf4j7dubfglfz228fnfsmmgpdh2pcs7mi0sthphnlvfe51d86un1bnd2etljz9iha99dec8ybt315pmwcd0mbd2nquds2cy299h7tok81gqs2j5wxhnkcbz1n64moimcb29zx5wmlejmz1cztv1htbbji98zqx6'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'nxmc8ayc6y7u1i9hwkcy'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'wf9dxbryzvoduje0eslt'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 02:44:45'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'l4o3uibyftsl00c4pmkgq706hyn6mn198ahl6209qhqqx0wz87cc9y08u6skgfpnbtwsknq5e3hs21bxx56mo0iu62frnwlgtmqyp6m52u4x8jty1arn1jibb7b013vakpu7ze15kj5o068uhlf4zha5vqbm1z3vvzmrj410i6witlhafv1kaybfimnek57bu6hguoug3y3ma3sf2xgshgszffriynln49rfwgujyhums1eyxqsvrk2u9h8dfqg'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '5fyjd7skq82dnvs7ln8egqe37upazqad2ya3jfbz3jw2d3t226jwz3rep91ts7yzde86vhi7l3aef7aglwz1ilcyz5yhkphv2g4olva1cd5yxst10kdf1bue9hvwe1dbdfsa0mcwgdf6kgj1wmx7tg7uhfefzcfnchi0e4nkk4hf1ylcfzsctn793yogkrganwgwidzihfvoxecey0ivjywcglccjiy4u5t72g37lbk29550alxobl124q4og43'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'cyfu4oy7gdjpiootblb7bt414h5ab8t2hsct8creqefm84p98405sgk2mj44'
    })
    application: string;

    @ApiProperty({
        type        : [CreateFlowChannelCatalogObjectDto],
        description : 'channel list that belong to this flow',
        example     : [{
            party: 'SAMPLE_CHANNEL_PARTY',
            component: 'SAMPLE_CHANNEL_COMPONENT',
            name: 'SAMPLE_CHANNEL_NAME'
        }]
    })
    channels: CreateFlowChannelCatalogObjectDto[];
}
