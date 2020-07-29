import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'g3rj7rofpd6t1guu6m8jofacwfcbxoo93sq4m5r0'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e100c5c7-62a9-4d07-a293-08d41b59792f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm1pp8rwfeq8rdyjss6yd0c9zy47zntp5qbefq88d4pqfrv3ipn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2cdf6a6-c106-4e6f-8319-041619fc96ba'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'i7xij6efaaacr9772g08'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'egfz5gwrmynjtiwlm7hg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'j2l7vr96pck3vayd1hxro5yn1enl1ndwvkn9fs4a0pgive06xd8n1l8rc38v'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'i6j6s6tq0vkmnxmmm5y16ra4sk82r18375ix4u5oxqzpybchf87819pxzf256n1bbm8l1wx06f2550j5zof1lrv94g7ezpuddqgcxwu9zpvya1lrptr8wx00eqt4g838gnpfyg3d0tqj0wmdo8nl4mw9vd62r16e'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'w5ldmsa3v528orq8ilfwyqz5iqicmtxylm0xqa7etah7xffhd9hwiok7lgtj6hdy3ihq7bq6gva50rfz5iga9hlh5h4hoe1fjhcbjlip0rodru1qtz3xgybacjpt0br2yeegk2skf7qzhydeffiaagjivdo1n84m'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '0p9xdq4qrnnm67yevi0xwjebde8vjyb7qnvrapuq8lnbkztziwcq0vginlxd5734dv5urc6yn56x8iv4w4h1a2dvycazr4ksda6ik42g5dmsdu5t76qxuef1sq2gu0ye9gwpb1t5dzsomle4cg2ybla8auv9xznn'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'moejhydtw85td1mxtrg7nmorq6y29k6kbsbf4tzov7gsug152w76bc48opmaa2cmfeh0nwremnct9bfoiyh7b8oic376xr5l1ciq10mm80kx7msd97cni3ei01ufc6s3b7bb42g86s1day07hmxtuv5fim3931bk'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'zxk5xa1pmmehwwbis5cmzqkz0yb51ovlpcrj9etdl8wmhzgmklu5jp0p7nnfflqnvzlbwy16ish866n5b5fhwx6p9yxqnxutziskatw8ehxis6kohdiwss09coze26kfx5sxqb5qzlpsq4cwrrt65lviaxgjb778'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '0qggg2xakfmw6t4h2vem'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'dly08e2xi0c2y1tm2ecc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 03:30:26'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'vrodqm9l0iqupd0w3rgtppb6w7fsdqsfwe8prq84fjisryv1ti8z0jgvw3vrjg7v69278tayl7p1f2kiylw77a28zozfcgt5jr3l0o42xzwgavkuzro1d6ookx83i1nnc2skr11lean714j0yvuylporqaj8x465v1ybmouj3qrxhtb9xjkn58xqgurjz97ycuhrm7waki4ud42oudkl5ujhhsdqvqpmy4c9weq60wkw95dl5o2514wwsc9etxd'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'slb6ed3s4dscv1r8mkv6htd3jfgnmuu5tvmjmpza4pq5acr6p6qvcloypre7a17hsm611la2q4877ixzlg5gmf9tgoc6dquc2x15us8w73c0i0zk073a9rus05fwgvewutdqm9xb4jaa8tzg2f0cpmsdrzxexz9g96tif4mgvrwaxhxrq2kr43mzypqpo08mc417jgokyf1prb4hjnnqaneaip4mca4b44rgpf74veckqoikqt4fx4thvo6mllb'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'kj6k3aaq6d42xtz9kyybeqyvueqhxmwlzfqxn4jjz4syrrjnd0jv6tr76lpn'
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
        example     : 'e314c0e9-7531-4753-9e17-85f341a25a6a'
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
        example     : '2020-07-29 01:38:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:58:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:02:53'
    })
    deletedAt: string;
    
    
}
