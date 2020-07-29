import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '686f3cd9-ad20-499a-b195-28c763b2a673'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yfr2c166athm4b0lr0c9467z4xw63pwn44o90ncy4pn3ujqs3p'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a4992708-ee8f-490c-a300-5474e2899a21'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2be1jlvuapua4hiwsyv1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '547bz3io75a75al2tf7lfpwvhlrkcr11vtjothtt04mye78jykcnbzue0vcr'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '90b57892-902d-44ca-865f-21eae0add625'
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
        example     : '2020-07-29 08:59:41'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 16:24:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 08:50:51'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'dyc7eco875pia671xk6kwko3dpipnxw0zvfht9jv'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '6h9k3mclri6d3stn5zln7dzx3afsmv4jtczzdkz5tjvfqyr9z4kb5s9fuh0abp1qih5g8n4xu9r7miq08kzhsxldrqw329b5onbfuxrbvjgpme1jdqazhys80z4oohk7m2qmnupyzk1r2jr6hcctc4u0f8d0giuv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kvdsxldwzsk2rfv52ltqv5w8ufac7m9wuewltnkcqh959851en5rj1p0p3iu3m92ihdum1bc2yfbze3hp9bbin50m18tnewuho962csq6zcneyzg9x9jol41dz2doufhfnqsjuzf7li96j4lv2aq9w53ewhea5p0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'k1nq2xo2dhm3jdb14m7j2xbhdxco4ekkgir42sq7qvg8g22ge356m4ym48sam3tlzteqnd4g9tm7tqqkslucjn9yefro356904x9nl9c14gl4fybrvbsotadw0hvcvkfdhsmg9ken2bey9lq1yyzzay77dkcvish'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'yj8mcmfkptrgtq8nrhieowjsw5cmzvvlka0low3xzdlrtaff2qsqzwxznsn1ikpdkk1swbf2gokr5fi9jl8qhpo7fws0rbyayuw1ov2hysh9jl5cng51eq8imqto6m93j2fx3tip5cwlisq9kfzy0j5b8317z00s'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Voluptatem voluptate et. Earum aliquid totam. In autem enim non. Aut quod reiciendis aut accusantium cupiditate modi sit facilis quis. Excepturi quibusdam qui.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'gs7hkf9o5aa2kr3r628gqeg310jja11daelq1bw9yik73irn8ctmqeeoqbuptx09h8fel43ue2gge25zd9w8e0s6o1s60rsvfsn09wuk8ggm2ur9ea07jgkohuganmwrarnl0rq6qcbe0r0rilwh6lrebhx2qs8h'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 23:23:34'
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
        example     : 'hpy6bpeh2o5dmz6dpdtma15mcr8dtnrfkfykwg2qjn5gssznixuy34aqe7oh2d8si64gfoizbepnrbseuzs0knrlcy15kjh8ybpgxhwpmrd1yo7y6turkwbgy8fuf1sacurbnv1rjmysvy5cz9n31qlpl4v6d19c'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '4jedui9jo1gnpaxqtdlgcl5obvlpje693uznwt3idp2rayit1d'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 916506
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3858912743
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'hqeox2ogsv2xff32fc3r'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '85yze18tqayjh9dta9ru'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '0zkapfi1ullo051kh58wd6qao0w0exf28n2icyyavjsowy0epsoxz8pcn4p26j2sbln5monebja7k3q5a8jz04i0487sgi0zb6bn6c4ff9xvbm2kf6j52ve7u7es90rds2hooah9o9623e02hy1x72uptj44v57z'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'jvkdnqea9z0k02xw7vuxhkloslflvznxx6ptw5dvkfa2jq9tbfd93mfid0rljr598nrsr6why5yv01l38ygbw6mp362z7d2kbui9qy97v668ggju2e629bdy7yxsz9py3fnko6cqxb1njdp4omhyoyw4s041jb2n'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '7rrvonq7acbzg2uf9x32jr8rrywpr3gqixc3ogim71m9u3zmpt39w5an6ol8hpjecjwsrg70ac78ht0i1mt08q1cucbb1par9lic1ec243jzuhbpm3vek3mr0kcdfc93ruu7suqeuh58dsphdlognfh8vskfdpyr'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '6vbw7xwmr7lr6l513zlva4u37t1qkeoo0t4335euevp08wy3whi1qxni18pn6lgb4najf7jq8qo0w1sjtixqphpaf5cu6yofbj7ah7ila6y29y5nmek2iyvduyim3imago121k0r60krz4hnc2qq4zb84736bo1f'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5806907146
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6985025891
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4471337706
    })
    timesFailed: number;
    
    
}
