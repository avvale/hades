import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2bc95a65-aad0-4b66-9718-ef4317b25191'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'phvwjqeadndr256r6sqa4xq4qv1hfxz00ob43m4wccxqtr4pk3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ca953a6a-5b43-4b17-99f8-a4e13377109d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'tw2npk1bv3dtp5wepyx4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '4d8fec59-fb28-4990-af9a-9027981e1424'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '08josf291s34nrjmwm0k32kl9b90i7g77502vpbe7ask1yin98alfm8jg1fz5nk4a1l8w787utnosmkpssotjhfvn80h886niegxqt7amfimt58bdkc8e7pt9qbgc1scxk21rxpcml7bfk4ab5qiljxzoymldtek9de5an8qekaimj4pulfj8ej5ml5cvn4nnlrjmhe3imylalhpzd1xs1s8nawckvopetytnjq2lhynp3rup3eepqm7f3kc40a'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jjpe1jqxpffjjw43h9w0uqu1r1tzy0h3hfurz59yaaat8g5f8rbul3gt7d0z1aavq2spurivd0tbxkyavdduklpaj05glyq4ojhz36ialytb30r8swqyt5di8hrtmmhnb272cmcnwrnrmx5kskmptaqs1g6a5aodwvi2ltqck4c81s2x2s9uzvwldq1vl4r1exdhq5s2fq2y42jhjpe95fuficwb2rh946qr1poa8evo0z0ajjosopoo6vtrfqe'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'j4jtelxqrvxoh1s6adt14w9ff4smb76w0hq94wzfhlbhkg37owp3an4kt85lqfzev727hm6qph8qtjch1n8jq36mnnrv5o5sd0fiq408egwcb2sq46ixrrvx0akh65xik5y47h9rgmkm9ldqjh192pyknqwf34ed1hlos50g9k7oqnkaguaa96sfpe7hv19dh7cyvqj7wpcioqzmcvqxpr19j7gghtt6m8caih8pqlc3x87ht5oraro5ogw67kc'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'xrx2i35fle05vs3aag18yx7layyy198qxxfxfw2v69yosf1x3jw0bbe1k3uyury9jchr8difumlhqnsye3zzicm2314oipm6jf34ex72fui58bd2ffk3wtlx'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '0onqppwfmexvsgbc2ltwcjyg59s4y9eoaafuq86lp9ic68oqz8t75x0luly8'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'llt7a4rrakwrgkepw94si1nwjdsu50936omznuwap63x0gp0egkkx6hrwgifuldhhoj8hlnjabyj7fqi4mt55hq45bmmndkozk0w3rcydvkexokherb58ac93puld3u00gvf903s358dz5piyramqkuflf6awr1g6hthti8h52nygct5ndheyxf2rmbr7scjpdy1jfllcp1bzqs1b7xdlnv57x7q74kwvnh50geld4p3hnrnyosdfik5h5fimxs'
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
