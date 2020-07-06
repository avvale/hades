import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '38bc8e47-c671-4c77-8325-263f03539693'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8a7df3b-0b16-46ee-8cab-050e956872dd'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '805a24f5-0985-473e-87f7-e3a1514d95d7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zjnlsmn3tb4rlljewzvg'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'vlod1otcvpmxxbadyd4555uprqm0k9pczo70ipc96wsggbm5r1fo8rz84yf62jah7d5sitffdy5eor116d3y76fl46ex7ng5197r1zu3i1wy33xg39xmv0odlnh704h3ddi3nbg29bw6s360rjj42pymzyvovhwn'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '4ge3lniaxbpiz2027s470ayu9610jrqel5knkyicrzj97dk752as71658zppusls4nrgmrsk1c9212gqsm4kqpnjsu09nrwens9lp3tzssjm1647g77nw5r93wt7hxb5dqq44oysguukfz8o2i3rxojwukzvl5sw'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '21eaq39dh5yt0hpp10upvz7nagjwp5ra8p6w5xj0x6eor4kocyaa9yhliqwlpfqe1huxv2o62gzkabjgjmhq0fodqgvf2ta83fbmqym35yd057jrqenhztx29ejv2mkmerpguxk2d0g02k2kmbreeju8017meo0l'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c61ugrnphuyzcevrzhfic1nz0k6dzj5q47vwznstjihaxw69rqm4kdmzc8x4nzszg5p4ew3vtqqoa41dg5v68n9iff11ugymjwv5iwe77y2g663kiw4g0lh39vqvbeushe2nfd0qh2y9ddcwg0cpbd7dcj4t3lt8'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2pvt4bpa0q997ubtho7ilqhkmh3dbrwu29j0diodilsfu8qcr8x8l6dhkrcq0bie9w1dxkacbklk147vdp6mp1dcymky8trwqrvspmmgccx6eqv9h0vm3xtvxs87ktnuq0k37orh576g2y54q6k7ll9xmw4mdjda'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'soclps57e0a8acdecr50tqdtc0mzkhp45810v5x06xiwmh4cmpjrbeb02pcblgt9bjsay4pd7grad03a0stce0frkqns8cal9cxgidwvqrpjgd88gqrsxchtpg0bcgmq5ycq2zju9nm519qpd5apk7qhufzr0dt7'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6sgzqea88bznrvir6mg4erb4zm1w1hnyfga6wjnlo0rg4kf5kzw4qw6jl0wno9bbinqkzvm7jrquebio6bduz3iyjmugcdyhluwelu5hryca9mrw2q1fmdv3y8m6tkm8tmby38qjzyh31ak2yyauhudzhinska61'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'awc2dt52mq6iar5bn08nfubnzyumhew1kolfom4uolifombvnevyt95r4zjr2nquv149ddp4uw7lmds3g49j5wmngrc4ebgpi3oemxkie1msj9b8dpu3k4f9q0m0v8dxhj7h7bzgyqu1br42yuv0jwpqhy69bhgo4lp2fd8s9u948ldl7q8p2zuggu4z0a0pofzclph3stva6zm9lqxnp2rpm1wfbmo4yw0y8eadk49mdbnnmx8ezeb6jyc6uyx'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '02spz4jjk2c7dz4avho5bpjujmfan42tltwwuoe7t0chkd7cokd7c5bx4bmo2e0qqwosx4pys67kxk059x4kmdal1fvh2sndw9vanwr5u8yhali27rq1i722l2e9wjhypzt4jutaswviinjw287428tqidl6bcwiz6u69pe8mznfrhbwwp3p5wsj1ctzlhik97nax8cmrrw8j58y31cymhdexism6i41xmnkd2ubhs1l7zighperf3r5ehc95azl0n0po96jxq0br724rdoz7zk4jxshh37q64bog8gvhjn6keqh3j6cdlf6efe0m37h'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'frsufmzzorzia1xa46vg3zu4zx1ii55zjb2e1cj4ejen4xz38s183wwvyhkf4yk4wac1kqafddry3i4jt2bugil54qq1y5k84dqyh55otv8kommje4o8d68bplhjllac30g17o8jq5fx5v02g8iqo2ysc3syvyhrtj0xsjkv3grqu10de7shhthkgxy0sz65xyik7twrd3svni3nwtur729xclr2hey56rv6edrtvk483iseag3i8fr42kub8cfl5frw0x142jwic3o61uig7xr4lopy38welvz9b1fjswjc7amsvbid1in008wkkoem'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'nsxklsynr3daxrqpssfvkyyyjpyfzgqlvnv0s95jzwgssmr7rei9zi78bs3330td3q34wq3c9510k6w3c5v34n6mcp2jiprirkpmxfheyo94cudaogln892whox9mkos19d7xz7ee7t20oylukk40nrz9fj6qyt3a278pj3zfri2ba234v3i22qsu8a1chqgwqih39ykmjpzb608s3ekkrkn3xck1zesgs4lo5voqwfcqdhnc88dnzffaklu480rqaxmmw05zixsm6wmdtjbzxqgaosp8a15u0kg6ygkaixxalm7byhvm4qjbpewkgdifhbgxnxudhhj7ktqnmhlyu0e4jjivnx2vht846uuu9j1sydilj9yrxsrnd9mjd16mxr26di60es13ep9alysphny9159jaj3696ucbitp31hc6etrfr142qu7wmdalqkbps83fq4edk6kl3ja8w345dlms7zcni24hqlxwrjfq62it3wmstmzarjibm43rph0l0afplinaey9ue6rnzqrcbvp8prd28chim0kx8iaqcy49mm1kyv1a6hxveforlk46m9wiaxpdk20g9a1sb0nfjuxeuy1zk34cqa0pvzx0ikztnr4baix3xaj6kn842hkjji1vynizp6dzte2kmzltk6mhq9fs2ix0hhmayjmkubzfr5iazg7mg3w7l9ib431te5gxtvkav3db3ukrdx2nyzgqkkl9ion1wiko4hcjnmh5p46ad23o5oi75ejj8pkui0jc7k8einqrsbhrsczd1h1qgavc6by2opmzorym6dijghaw3vfg836s8bj9jf4yazbj6usci74n711c6lgwxvc6d883b3bow7ks58o6ysp2jiqo1jf1dfhkx5yc7xn08iicwmi3rlm2b72r42iv26usj8770ihyfz32yxsd3xesnv80unj5ln0f7ne2az8vmnh4oomchj0z0n99lb7zzyyqpv6jy98txdw44oyoaywgfg8xwxhjddck550m0'
    })
    parameterValue: string;
    
}
