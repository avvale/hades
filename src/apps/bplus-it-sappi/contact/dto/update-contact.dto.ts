import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8ed95fdc-7532-46cb-8408-181368cecfb0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nkart6uz5li7scotsj901fv5f6suglfyja44f8gfyurredhc3n'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ae9efb0e-650a-456e-b39a-8cba2399fe51'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'o7s4g2x7lzlziydro3yx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'e8893008-dcc4-4e54-a094-09b2287d20e6'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 's8eb1i9azjm0a6z9la4s9vva18d5rfrw1mr20ebo43lslytdcdhy8x344eu3nj31tp2cxbd7f0k9rrhcnt56ifgub0dqmzta1yn0qhxip97frpcjyhlfdou7rsjkfi976rlnsvlious7s65ly9duodnhw31k045mr5mvnvkfy48ytgwalbo0rj8zrnxf4uzuxi5eqd0xmbssxet3ojxxooa13yapu9k11cyn6o95knmjyi2ajftpmtgvzxrigb6'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7k3lwxudb5sazggozixyx64encmpswuso1l92dpp5fjxwbw5e24zunwhccxiog4agdsxw67ufe5ve1hm4t553lvplo38egnbyh70l5vehd6kh0kgyimgnx5pnxl805g22l2c6ghmegtap0wyzhdihhl1ffpj8bu3djr2tnc9qdahpc54f0gawiqio6688y46v3ng0gkl4kx4ywypqalp6ai1g06qi3cnoal1ay10xu02pg4qcmyzss5o8i5bw4r'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'tzh58xpwj32cdp6915i2vuhnz2ielfqdtmnrtdq2tr1waj7zkf92c3exlk5yq5l4mi35a4zu6lcmi1vkzrv395nwq3j2u6dm9hb5pr6vs1b7cy2pjfu788h59nx0o12n36jrolds7xjb1durk7ytmlptb8o2rv1c9qid6he6d4tfhtr1rg6w8iug04x2cuo31s5rvfbucl6w1c27dzu7v723l0h9ccg27j6k5ix12o85n3gzim42npol5e97m7w'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'kel2gvcpn7u3o4bx1dvgshsgtjvew11lxbpf97opxn5b7ixk1nblcs9dvq5nqkmlrpwsj9pqcoalawih9oz5tu26091snkwx4zeakkq6x7af1wvnndoxt0go'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'psci4j64n9xwy0jsdqge64z6gn552xsl3fpd4p9qmouqg4fd86ex3mq9x5de'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '0703iyip65jgu3ywzf982lj38bbjjmngfqt17j2cb68j2unm185jlnrlidrd5b5m0w4mh93ctqsn75p30jezlt9edx284lcq1d1td7jdojrovqz2tez3h6wzcoxza1u48s0ro2v62lpk9oolaw6irhi9qbxuv8fsvnsz7dcqvn75bakb05t405niixmapi9v3s68m6ggkez0qoeup495vilzughw4ij3gp3ap1rxacsy00921s4q8vjq5gzbyxo'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
