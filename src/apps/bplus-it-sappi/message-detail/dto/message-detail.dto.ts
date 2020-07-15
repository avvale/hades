import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '826afca0-24b2-4e1c-b27f-42c86cfb6336',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ho2nlu0fs17ziuvrpdwj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'xwoijssa78k72ngm3pj8nf1lgl21d9986givd9knlqebjof5o2c4yta6weu5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 00:29:25',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 23:26:27',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 12:30:33',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'emn0t8hbsnzhr6tgggdits244vvqihn4auh6uqgh4xwss0mhada0kpayv50pbpekh68gv9kxozfj1tfx7xepztwd3ih89kcaio12regws64bks6krw7xeob747kaxclsvpx4or6urb282zmwespew8s305mvvv32',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'nd97n7k2225hrp69eikeqpdbvsq3moyn26sie8f0df5imrf9hym9bpvipgqv4jmhnr9b7mob1qu0bdq8xx1obrx34x1wd01fc2cg1slqbgsgwj1eh3ar07kemv0yql1qt3gzbddun54rvgg9svme4ci13xnobjej',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'u4dy7j5kji2xs3rwva96vk4trvcmjurfabdbqjsr3p20ugelvyjat2q0qzt3l5drj60kl0cqwmq8fmtn31vm9uc5i6ab1qgfnlr52qim4o7d24tkwjfs760d53bp4b7pweoizaox75dxizitwb7f2w7rfv05ohau',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'iue9dajdr1tevnypt5d8nfl61w0d4wo8bul4q03x3sfj41n76ljfed4fdiykaqe5wuyjk34b3dm0wy83y5ea2dkeicccat1kn74mglzu8t263ky1pjiw3fzvlkqdxl8xey0fl4v38wcy9wacsols5heticp4n0do',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dolorem culpa neque voluptatem dolorum porro sed veritatis est optio. Deserunt excepturi et maxime aspernatur qui voluptas ducimus ducimus. Temporibus perspiciatis a sapiente ut at.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'muwecaru0m0pfscgp46rr8xq0jt80s2i6ici0xg0t76dwyp7s3ctsonvdgc7in28yjtu2ti3uiz1m7zxwoi4012n2dkq3mql05a23myspnprsvky4b15f64ytttwruyzsjjtmqa9enqiamp5xsgj15kmk6e7kq1g',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-15 07:12:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '0aqdk0a288zh24371o3h',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'bthivnzp57uvj76qwcvfm92r6jbgrpe5iy4zigmpnmsdoaklvd551valy9tzws2y6s5m7m0gli39codbv573murz1zxzu5by83ix7bso23cb3qfg4oint1f89oi6lq6ql4o65uo26jp1nxcg0tvkha4flmmu2gqc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'f1g2st7nsncu0fjk0a54',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'p0zshx2p1k5fkamct1lgcmfppjtp8ce2a96evjbsxddwd7yuz2eg93x97qgtz7rph6ve7q41wc048gtdldegy9kztnfbu0si7rfwrm0ji2a36ge1vzqja03og11szbhsr227zcu1cnm37wwivns2zc0xtssbf4yc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorLabel: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 9531287818,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'h9vr248bksowj85woeu6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'qxokkj56cl6eyze5cu6x',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'cszea2cblj4mvzsu2k5j9xe6mtgaain1qlvxr5bwopcmtr6ucl7j5hh7eofvjt664czoycwcty9igegox775ydq2eihl1qtkz4ohtyh6nyoyvk29ubm2w2j04gg2w1fz7xanuzzra2vnzhiumskn7a400d0ol4l4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'w6ovm7wql5dytw4o4und5i6dth6a0acotqwimrbwknnt65y8w21hc2okmxtumxdgz4bvwjauk0awg8k1saj0b5p12o62p1zuhj50tqeted8yqabj8t5wzn7lxqt4oh2rwnh5tu3rw98og1sgpmrkqpbrd3r0gz2e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'yjxhz2rlsf3fndhruo7t2uvjfte4oo9mxtuulkbq0sfyantq08p9x8h7lpzte3n3ma5n218st4yvzge0b2t5bffcx521tcgqorvd6m8hn13m1fge8m0yr1g46lxof4zblem5rqt0qv4tbm5mn246ty4qtm5x5j9f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'equt2mrna99hnydj71f134w7dn51nm3vr9n310gk5i2gz5vf1di9zvq0wktcvzi695q95yzkkyjcymcsggxaaws8p5azj4q9r0gng6kteob67y3plwk7sl7mmoo9iiplawrmb95xhkvx9sbvvzanvjcx3qx0pvga',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8926842548,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5394585358,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5802997438,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 23:06:45',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 11:27:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-15 05:29:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
