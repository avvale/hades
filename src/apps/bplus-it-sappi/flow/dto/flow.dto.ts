import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'hsur8jlzlius8x2fsvsiuvbvd3gxxc89c0qxvik6'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '425ddd40-ebca-4a69-a093-3a3f40233b07'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ufy7pf71xrvhwxamhepv8t3pq4ixnyhc1530wbj9pvayrrumc0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kk11m1opu32dgm0g7cxm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1b955zv72wikf0s8m8ey'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'kmpo2ftbjuzqxza0mpazxgb1w6kb491d1cc1pt7hj0uenajxe5a56eu5fmt2'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '49q38k6urobbpbrwu3kwjqsp8ibnm34vuum1sq61wgx4ynrj9gi4f15wm48l60qgv6araj0pzbvtdyp5bjn7gjw8y3recx91qrw1hhlqb49em8mfa8hmp041jdihx9ipwheoy860kqo3dasg2smm2vwa5w29xmrd'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'jyaiya6g4npzf7p8nbm0ux8h1ufg3vdf92b8e5pt403ygit3xh1uwa3h1xbi8f1uai3ibe6no7po84uw63y90l7ajlz9jwuukzbkkn26ul1yp7cn8gac3iu1lx7kb3ftewgebgvpbghge22lbjfqhax40t1jnzmf'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '1nqtqsenkccsrhwufxyeg9i3pzzymcys6ohmftmrh6hwuqlxjvcczs9p2euki0did0t72p7d7phxazctzf1jiwmyurmjtdpfcw9xke2zrppo4nkttz9lxxvkqwwb387r30zf6x1t1com0nut9z9zqpsi816xbms2'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ngzz9ofyvkh4ehozx2eia18yl7kmi704blkyyx187xky6xab1nyck0z0qjq6xjzqlkzcevl8bz3fcrya4rw6j0j7gd1uan77uo3xvlvjxpq5tomyy0jt2k98sbu1aw93bs77904sul5yvrjnm1twc6jxjqpu7rkb'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'z5nclh3ghkzvn7i45khsgf5zedjxih3fbh3fbu5jyzt3bplopxn8k2tfkwhj6fmo6jvxonbirfpihgj76wr6ocy9dnyr3badgylqlyrdvarsqnlgk39zigiylyxl7twbmdjjwutpea96ns9r54ecluslzj1qoc98'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'lp9yolh6126wjboq79gj'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'q0sxxq9ekqqufpi0k71x'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 10:59:53'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'dks094aej72yg4p38nfv6q3kvih9a5myyzosikdvokf8e8hzpitux4wn7zbl22yxljgyq4xwblsf7wwp0i8eu0x9n4t1ebck0ksh1tpn8n5zlujy7ue8aqrlgwukluo7m01vf72frg1pzzdst7bbxas4rrykmvozk4bfx40mx3l9jah9ptvc8lowd62qw2bjhtj9174geea4jyk6a5i49t13mbk2jvudep6k50t21laee60v97t8zgms9rh0o1n'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'fapf0zaec0fjzi7uqmfgn8pzzsi32f22jdgfyk9tfhvz0tkd864b2xtfu9ck7acrdcnvq5il13qcc0ef2tjho51kksebc49rmx7toz7q2w65mlk6v9i6fgkei3qkkfas9fgex046f2ratd61rzncm720kb31frct05h1ve8tvx82zwmn7ialt7vfralm9mb928w4fq8dyxqw1ejgkbrbslce1n2d8z2qgbtdohsltvhc10i62kdkiy4fpe23l4g'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'tjfm34u3duboi535c0sq4ec1jbw7sbmitl33ojol13h7h5npzytc1765q5cs'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '41263fed-cc67-4ac0-a672-06fbd28045ed'
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
        example     : '2020-08-04 19:15:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-05 08:31:24'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 19:57:24'
    })
    deletedAt: string;
    
    
}
