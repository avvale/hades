import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '2186eac0-4963-4b7c-a768-4dc9c97286a4'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'bea95f09-4110-4ade-a8c8-97cede034565'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'nij3fysl2i15gl4libx6'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleId [input here api field description]',
            example     : 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd'
        })
        roleId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleName [input here api field description]',
            example     : 'nlfnow5msd5klad91dqsmhmy7yscqru2u68wbp3uekhcu3n5x91czejzlmt94ovkoqxxi2r9xt99bl8cra8mt1xveybt7uaqq2jbloxre28ud9wogg6ptj1j037i6i6ms1ncp6zbc4lh2sdfqql14x2dey76uf3n5xwo7nkfu4k1ot6fbextlbudd309uvdqffl7cjzz2h7sjmmf0wadmyff72gil3pe71b2aquzutxlcqddf381mhi3uu4nzyk'
        })
        roleName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '9t6nv403okrn9bhdwx5qeiyza6ydqnl90ybofz6m0es33pk0y9faysjj3aqspedmx5eu60vfim21085hvf3afiwj8s5stf7taxaazh6kqg064mng4er1bauvc59rkcdk2yt5uzt7jbw7bzlbnbq62zfyuzulg5eq7v6sezc94z0rg4a99u4lor46q8jxdf5i6eq8vv3oa5mzzg94dhws9e7jvbstumls5pd23a6gy0u8dme4zd2wnyhrlmr1rrz'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'surname [input here api field description]',
            example     : 'hnop6qwhnvobda8w3pu24mmx8orlxs0aneu7bdmzy5bcohxh60p4tcthkkrii7c0stbgheirr3gdgjdziwxfes4lnmqt0ldlo99zshbnqsnb49aj4lolk0fsjgylcbakweab7nym2l8evvqy344ktrvabojbkeifocri4na46ohu5e0gb42i1er76q51n9km06du0u5srt19bf96mqcd3rnki0kn1wdsz24eovrw5s3tbz1vibfhnyzav0l599r'
        })
        surname: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'email [input here api field description]',
            example     : '3do6niy2f6c9apcmqlpi5e0fw7jvcayzj31t9yvs4jl58be1k66xejpw8tx8try9p7cxxhohnpe3qttvtrm3llomsyzg9ye8okr31f06bz9lpykyk6476c32'
        })
        email: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'mobile [input here api field description]',
            example     : 'cdk6lb4ujtlwr7nbgr4j2kh2g8dx676f309vtondqt1g8zlcha4ycb8wm9l8'
        })
        mobile: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'area [input here api field description]',
            example     : 'w17z7m0qc3r80qs7xsfcj0sclstpm7mhulumxdi4h4zcdxwvtemv2mwfracjcmvmy066pz36a3o1h8yuxxmlc1dnxu5w2tbbh73nxwj3qlsxftgxl7ea9hibdu57pktzdns93ko4tsexbywzb3kzvdgbqb6nufvbnxww5e30bpqsra0bay181nrhj0oup4rrptnq8nf5b4mlyzf7apivy8fg9qoo64mw4laat634id0bv9lfcryo4kaq8od620z'
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
            example     : false
        })
        isActive: boolean;
    
    
}
