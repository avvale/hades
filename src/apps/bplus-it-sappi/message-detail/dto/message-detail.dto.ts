import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'bjo0a4j6dgd6jtr6n83k',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'ifad6gnvn59c9q54q61x58af7dtq84wg3wlygcigpvnyts8ezmb0q5vgjov2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '10ab02f3-b600-44cb-a7c2-63978290326e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-17 06:34:03',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 19:28:07',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 02:03:19',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1j2xmpbmh16mfgbx7ez4dx6otsfumorzo2f8oddbbnsplqx1aihuy3otqnea90r64elk2u59qpa8hnrdugcri6e1nnertw0xy0kqk1lx8xy5lq7is1ob5xy9157jrsygpeucrw7r9tvxv6wz1c5oc5ckmzdxyj4o',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '6zdi8k84wqkod8h5lylpti2e8fij9qi51fsoocfo9c9sdowbcpl2w7qurpg09no7guea3b7tmpmibokcg1sw9in3ybbtf3349hqter0sq24q41i87yexxl3blk3qsm5j0bkwpugyxoqac2bvm46lprs1qmh46akk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jk7um9dzbipddos8neb0cimg2i8izbcgrg1jofedqw019qkbsjcg50vnpdukhbblgkgfmr8szwsuu8vaess2eeedd5xh0kw4fghxwczxaknpwnirl31ydltsmbga6t96yr4lrsa0p8jlpo1k02k76fpma4omkk28',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'znnx03otbl0hbsrfm7259tabpnzt3wo0iko2pha6kgqermehkdeaqs3rg0lrk8s9qfgvikddpzz3qaag116zmudcwhhq62ccdpzq6bnjcvfqssap61pk606po2pi35b8w62gbl21drhfq6oruv6nigkuzj0wzmpc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Illo repudiandae iure quia aliquam pariatur. Ut laborum officiis officiis qui. Dolorem aut explicabo sapiente nisi. Exercitationem deleniti voluptate autem ut est aut ratione quaerat modi. Aspernatur quis reiciendis soluta. Cupiditate quibusdam qui aut fuga incidunt quis.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '6780iwgfte88qg49fdyiqhznwa7eethy5l52krid50jbcbzyl0eq53848rcq329kajnkfm9e0tr7z8wh73wdt8nnm2q29ahxtv2j46r0tno2yndbohrsxbvrcuy8ujtvlrqzq09nvfkd1gmfy965f43b6ng4jwwm',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-17 10:17:48',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'av8kifqg2a7b49ppxb5x',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '9lj55qzm49lss3mm7hsu2fp7plkdodp4ob8wnxdp0x1qudtufy706tzlhv6uuzgpn5751mxsjua1j80b8zsgvjh0lwyxdhp2emmln6fu48kcdlqlggik6ib4l49nt73s8dazbk6dkmn5e32vzoo26mu21pexwjzt',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'g501vc9eczahb6n77mjp',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'n59r53miftmvkas53aes3iylkso4ss68jpg4vje3vw0xhbjlednzbh96l6rrof1g4vr5eji2xjwq877wdhs0lm5w5uemfeb8d8obwtxk6yaip078loa8wwms9cjbjw417nx922ezlhxmnzwl5039nj8j42n4ext0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorLabel: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4110784172,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ljryhr2wf5du11z73nsc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'pr8tbd3ke2dgt13a8ioq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '19ri2pouxgnsuiy9im49rqlqe7qhmdyp7fgpx27nmsavxxf139uot4htvk5twmbtspdsdldkvnp8tzjanpgwd89wfy6v8e04ezw6qnzi4sh57mi6v8fmlmkxy2ai2cy3murb5yeg329czitsf1tq0tf1vxwbwchl',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '6qolv0fvaabpro5n8y1ukztc513814abqumszjbo36j477y749m461a2cm5lp7gq16rfo14i5zy03vdlk9294lwg88x7zp9jmeu2oy5woqaaxod8s13ugixe0bg05q6dz97e361fo5bnp8hqj4cu2c4poea8kugk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'syu7m0krkrtk31y5d57tezha7j44c614cj96xgie6ghqv172l46xkpfe7l75kdjf5kirg35yk8efa1eivdl6b5snvep4fqmfyjxvkhv44mlosss549hup4hty1fi24hj3t3gfeon3rnb8fa9cnxiqn1pb335p01q',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '001s6f3i75oa5frt0e14lvmh9all3apwdeswb5ck5y7nvnm8nkm4ths6mu49qt6q7tw95kmmnjlzff8g5eurg57g1wv35bgnhlhq0iuks442k7e387tmxixygnl3vk4rp0hea27kyapickfztghap2y4a36yaba7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 6969240755,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9488061788,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8202343701,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 06:05:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 05:37:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 19:32:33',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
