import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3af88c70-a54c-4562-990d-44ab464f5c5d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qg3ygtj4ddiim11xpo7224xr91dtknscdlx3s6lq1xfuodueid'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0080f5b7-8930-47f7-8197-62402c76fdea'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pfq1rd9i10fv2xgs688c'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '154je2ayd991mb8n9p1dp8qr5iuh1gfty5witwtffzl5tfs2h21z28qbs3qk'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ff016f67-887c-4146-bd38-356134465749'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-29 09:44:11'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 19:01:43'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 07:31:54'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'nae2hb5znmciqxysc0w17xp949tbwnsd0oazrv0m'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'vkpqx259equ2fu04z3vyyf28vmsg48kkc6jnj68ao72t0x11x1refer5q4px3p4l0o9kpubkpuay57lksytcmwxvgqawp29gthq6pgj36ty58reqko33ol660zg4z7kqkfdijo4gbgsstazpnmd62mcfjgwhl1sq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'y12bw7p6jkodkcasffpoxidaf38ubdf9kbc27nu5sepo99uenl98dzyxooywp9p1910867mtip8c8wgo0aloit5z8nbb1l9epqi57j0ntg04othdyhy5b5adpcj454wky2hljgxmqy90u4a166uee3vve97bbcro'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'p0o4oxtk5y7dgn0w85oyyexxc6lxnksasm62ab9hdnv7sz0vkim6u648u3wjp5qr852cp5qcbo5xoguw8mutzyikupqct3vqvdwjmuhslzo74htkh1q098vcv4x2ar60mn96uou8up6g3fxyekuwu7u5d4xh6azu'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'cn2teas030mqt4fhjdvvco79jkuk9jgcl1vsoozvrzn7j5fb6498exjjce27chcqfsr18e9lb3j0hyimdrfuyatwweycgqad48easuac2mqrgrq4xj777fuwy50bd43rvqn2fmsbwdyfwdliskneb7n3d9a0a9li'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Corporis quibusdam mollitia alias est animi enim sed. Nostrum non aliquid consequatur non praesentium id. Aspernatur in repellendus non. Dolor eligendi consequatur ad voluptas laborum dolor incidunt et tempora. Sapiente voluptas ut animi unde. Necessitatibus tempora laborum doloremque.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'c8f0qsbgjzdl2fq584qxeikdbr8quqof5n56fklqbvnla7iuhlflqlrje5exbv5o8k2rah4qqhrwt5iynorsr752kfo9wut91zxt7fatfzqjsmbphwjxjuha0nrepfhweyn4yfdb6rci30c8g2n5o9cd1fcksp3g'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 15:16:25'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'g7bgwfkx00180r36q6l2n7e53rc9yg4qoijkc2iqrgkzwjnod25rnrxwvd5tvmvk6an2vx6rxzicbk73p8h4u281ynt42wqynghr6vkmt5al2bjfz3volrrdg1uf861zhae97gtlkjsj3aihrt4agvihrzokwocs'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'm1qodz2i8m2sivxmscu5lnzbj85s9zyon8u2ygzdrbs8nyurbi'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 141788
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 6922148666
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'v707scz3sufxx7dxd472'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'id8ob4020z10xro5vpo8'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'jbp5ixgljz4fvam67rh44c38vikw5ys5l520dmiy8mmu5epvpbh315q9rguq0no0r5au7l7opcmk3th2evheo0tsroci0oy0boxdiku4wladim8jzd3kt0a66kclhfglrmammxsi6km08gspamu386t9o9sw0k0n'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'mj1zb75wy0tvl7v4xcotw0e6zpv4ohj598vsk9t6otrslp3909zkrtvy6k19nps1cr5m102bu0896vdhd8gw0zq4g6bbfgc4gw00bqg9p8wofboiuvxz2x9yqvuxtznmnetlgmub53wkhoqs3vg2imuk34ifydyo'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'gmajxdeupv2m0whofu8p50wkfipg92jlua0rpsvs6gtqeow7yiqi10ok3zklk7630wemdt4e8px40h4fc9ptpasxqb0ic4faqyajoqv96aaw59ntvkrfnud3et1674pmpim23cs2lpjvp3peoggpdf2nqc5uudc8'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'mnzpo3ejkjyxab1y0ukusg7g5nm3tfkbgrgdw8rmgeaupymomx74o8rknibf4yhcfai19wl2ypw7554eatapxbr5stw5g1gqeay4s5xezrp49it6gi5gb63fqx2oybcs2bd5dzqs6skage8q7bg75xg3e7u3ht6l'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5643911322
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9131388060
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2329263386
    })
    timesFailed: number;
    
    
}
