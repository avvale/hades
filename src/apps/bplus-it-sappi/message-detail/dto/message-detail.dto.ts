import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
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
        example     : 'rik9y4u21pa9tnuzyrykicjlhkqmvzb33oo0oqqvgluypxnaqh'
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
        example     : 'tdhf86i62pif4b2ugwf4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'nsvvgi1lb4w6l2axju01wv09x9rbdvid6irp1l5tpkxvjlp5kiikmcrqfa22'
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
        example     : '2020-07-29 14:57:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 08:30:40'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 21:32:59'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'y0dzpnn78ueh5dvdlocb179zag80k67zr1jrosan'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2s77ptyczzmiqe8i5xw3tud9rolvcuqpzs57oatw4627l22m6dmpk4sel3ivfffok8lhbukda6y6q1ycnw6cya89o6tphayjm7tb1mhrcrlwdl2z6afj025qe3pvxu4v4jmsr5e6kxynll3xms5jm37xiebypc5i'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'djjrwpfg28eei8gb4ekxzy24cuwpx8ebuxvk5mw81x3ejpmrqekxsxeyhkvmasfb0cbrox2txkuh7ivarulwli170o6td4g1as676ge2lucpw8k3dr1n42cjxt9uj0hjm58ivw0ncxb1ioyn41in9q70ca22s09d'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wfl35woaifd6m11att5tpfj5vomh8uup10nyex15lwqs71xskfy0wr2sdq7wkvzi23va6yelddr34roo7mdlvg6tbpea7m3nzug5q57j1gw3jdnuedfd2uq9b75b0kehzx88nee5mebus4lduvd10resvlr0plhy'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3v2ktxxnvkrmxhsgskaqjmtv7e99cje4n3gjdpir5745e2qmr0q9hn8a6wx7el75wsz3ieigiujhlnewt4pnu8fq5gqc99w61sh1ac6c4fx139shlj6o10o1pl90ikfbnxg5zuq5x1we5eolkr1wiq6h6qu58sof'
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
        example     : 'Accusamus ut vero quibusdam consequatur. Dolorum ullam excepturi vel. Et aut eius at enim. Eos aut qui sed error aliquid aut porro. Omnis in assumenda aut similique.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'jqsel44sh08clgz0h615uyqgyg1utsyq5lu9fx2eyjav8hpb13ulx935pmesrhrldx1bli8jat8y5gnieb54ab2urq9p8s6k54a36ft9o40rjhvzp9meg4a9bmw6s18skm2cyk4ts1c51kxpt7wrx6qr06xx68gu'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 00:13:40'
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
        example     : 'qnrns4i5t4h80327m1l3hb98foqfv3izfibesrahvb0mmx61s7c4as43e14x35vw89o82r5g8anbzgux02mutd1aezwdto2yn4f0w4tyd6t6bl9dlasta6m0aa7vej7vnyz1hpzm3mqdpf1bldsv1c04ne88lkzp'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'li0wws5if6mvqxf58ypfjkw13uy7exh7zrp67dh7zt8teidvok'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 111601
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2755353583
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'z3gcxojdo867b58h8l9x'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'ppqfn7amgjbunmctz9lh'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'et2yxeu1jey83g4mj5cx7e1zh4boe4klqr5junr188rgompl0rtydv4nb0va4rbn2hb6mtrbje0ckzlqus95fidkfqejwtw8fs2mm2r1yjxcdwm57tpjegnpm6vck0s8go447f54gkrxvdyrr1ucmfccgk8ukomp'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'uuhtack34qv1ugdegqopd0p2rv2hb7r3pd2uh4ar9fxukmubtm2ygoxkazrzgs54522u8460ouv3m2iwiv0ti1bkj2kfc7sw8fwjprzju8awooh61cwjj49dasncn1cgu1u09x5cj50o77rri4hj8ybe3i5ea5p7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '963uiawflba8f0jtvkfduepktr8gzpw6uwhtp1hrs3jicw1s7hxr5wx2k7mlqj8wus90gu7uom77lrsmxbb5uz0bhlrq49q8ig0uybchgbr3h8fw7enx28xmlb91qv3ci5p25thydf57btrkymwscnh67t5s8jlu'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'qckqerrutld4c2o87orbaeudijv3u1bajaa0873qx6z6kuae9mkpjj8liehay18nxsvavbj09zsvh4wuz2fgttgfc90iqqk4kfz9pgrsk3xbqkwg4g4z0wuxp82vnlz9jgdoqzocshzik5oywiqz3z0jfl7las5a'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4231589162
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5721969879
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7513971394
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 23:31:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:47:07'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 16:53:10'
    })
    deletedAt: string;
    
    
}
