import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '7026fres1rkmv3by06hdbpvwojpy86rtcreuaea1na9qtjy8fq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '64f1392b-8c73-4389-a675-00b624624448'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'tbdsdclli38dik1dyfrb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e13ed62d-5fe3-4d96-b263-eea94907ba86'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'xj7z3f1ml59amr31x29dqdbidcvcq43qxpybiu6agh19nkxjm04jugdrtsn0c4emmn447wbdcmat5rkym1wto50xva0q0ansh3yee0rvk2w9wf774svof8rnvyvo9o2oj00b8c1ps3idnez9f8qhos6ig6l7yxet'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '8x8ypctr90w72k0ncuwmzh4oa10333bcv32njhbgwxnpyxvwf23ul99hj19ysvbfr3zige50nzg6x16jkmg2s7v9jwwouvw0mbz088pa983fyczffn593iygh30gz5i911l7ezkd0l4c2gy67l58bf2g8rud9ruz'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 's2p7sdrp5jga308era5xkrt54pefkawoq5ri1wlzk9hcvccdvjl38rnmsc8f0cl3npdoke99u64b6rb2s51b2zj64rnop8iaafl5yvq6tn31xqw3zhknpx5ha10mmz12rvylegvj0qa4vmr4hy25ff4einz165xg'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7f69f1d4-0667-47b2-ac20-0fadbdabb42e'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'laaq032rxq0nvwbk5yci1f42k4sv4gug8w83wwk9v3gmp09u7fcfhy9cc4pnalrqojvwqgpkd7vn015mtdn22ylwbbqjlntzyra31cw9y53acnycevkp1dovqt69rsclyblrig6am71aka8pdtcx1q2ts6ccw2to'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jmpq43sva1kwijy69zehw2xk3uwdxjvvosu6stqjjlw44ognxch72sdqta8zaovtqaaedi166zinti9wtlzbct0j2f34x1qqegim66xpste01klomhu2xoa9zsjuzzsjsmeihayfgw3ndxqcx4cx2eszy4nqfscg'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'lsny0js2eusrsj8qtdkvt9id8clcccp28n7s8rpfmdg7gik0dbyqn8g1nvrp6dz1o8af0wf9eudk1ex1zyf11et5lzhf3tfd1zkq3b1qb7v9uvfcudjzi8ci66ypf4iee092g3m131l6h2q5j8wl7zif6uwn9mzg'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '60rwvxl7eb6nnmzkd2xxg7uox3mmd0dzogpk1mfbiks5lj3k2f0pxcvsh64gl30f6rlguvhz9m44bl8dyr150y5dbv4kth6mkt2yy9x4igo7jlubmu0zdeiyz7b9a4qkbqm56warrvukou2dhdomavsv3k6w9zp1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '36zpfear7lxathm0r5uq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'z9yz5lfuq5k7enrlvom3qz4s41e5rnfdv9p32ijy59joal69gf4k2ddgfrws3cha5gix2wz4m6vo479x0miegukm5d8sfj0srncn3rs1bzlj07h8x34n5pj0id45yet558orzuey6qy3tq15zpjco9rehnxkem27cnveuv34t7648bfa9zsj3mve92vnu6uu1i5pzq49ooxpq9ud5zo7gq7kw7tdvpa1x4fcxr0csryagdsqqdkscjags8skhg1'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mbjru9o9qbgmft6gfzf4u0cuuvrmz6ulhtjbb1p2c1j98bdk77amf1g5t3y2brtwak7o7e72vyqit9iumrjh3utg1qlusnl8a95p4dy70w51gioyy31y9564hyotbko0l39m2w41ar6t0z3z6uox6lrdb55zn6hkvh6ooovzefyaa5js8c79ixck1p4bp54zdb7zlqa1pwro3kih63ro7iau7o49uvjjpjvim5stll2ainavuny0orubhq2e9x3vy5pre3p04t74thzek7al0jf2109vojfx368797yn3awzg5t49au08nztebidv20n'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'zb2bq8czrjbtd7tjxb6cqksfq0k1kba49yp7shev22unmkmx8ijd9cz2q27q6jxbw4futb71q3wt2sdxu463h02hfeee5fkb8spsj1vi3punzenvktkc2177ac670pqy85q9ybu0jdc3qlvo7fend3ssrzwq9aehqo7hxb6gd9ytm09iqp9x7hlfnvpox68f1pvw7qxrvq7visw5mz23wm4ltzjq8gs598oti33z2nn5v11imefpurm2fe7qbofcve2u23ulqlvv4h5qb50ekr9yw1c9m23w1wxfimcilkcinsvbbipiwfi8wy24gibi'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'awizj8mtrjvp6wryc4jkgecre8n4pjm9vh95adjo0v7vc6niq7ych19rui46dj1iay0vp22pqskwtmbyt093dfk29vdgb65zwwunrs5fxi3ml0xvy49w2xctejq3osq9amfo8nfjzy0wdjxtioptrwlh1ozqix1v0miqe7s8bddvyll57fs532inld59f4h7iwhcf7a6igi221s81gl6uinl1fhw6js983c3w8uxeh5s5xmbsktg4gw9rrfku7lkmysnak8i6xs1lqq3obd78flilp336t5ruif1zfzml1xq6cusjnog6mmlx702129ughj9k5t70vwe0ftj1l3xowmnd3h0ef9gnr1zesgsrpt01r907zp691jx4s4fj8c4elamktazc2zsohqdj02wiin3d6zcepjx5ctwchqw9b1cm88339339zgt7809g2inokskajdcptwvlvfgx4ddh6i2veud0j5mzqdjhael1a0buixtoscok4sdsi10h7mufpku7h7wtsyg5a9seka4dimba60sidvdevcvsrg9lkam2jtgy4i3tpmfecnxabxzxjpbraf9ddtdqmaqwg599lqdcyvy33wdh807afatfhxwsvj0644tnqih5fe4wrhmty9oyvwhp5qe0se3n6zq4hua5fyu896zkpheiueqp2uv1ylithou0fglpflkr830ktu0e2eruajdsugxw36vrtxm6ci23jnyphz47qqdph4vb7bksh2p6dumd3rvra9tf3k1euzh4zs9heowmjoszj9px7kayn7f7cn9ftvgp54ijzswvf9a84dgzf3gnr6yxe8a30h30hrd72ervnc8hz5wbwjscvnphmso9aaoc3jkahsm2957hkzvd0kocqman9hs3xy263cnhclkbbggjzncj5gtvotyh801y9oy01e3b32i12p5yz5xgfricqchzpi4af11dmqqe3eqe3w1fok5we8b0uv3m85enpypkaskch82nwss6i3lrlsh6cfo'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 06:32:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 09:56:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 14:26:42'
    })
    deletedAt: string;
    
    
}
