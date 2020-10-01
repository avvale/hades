import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6a01c0a5-1c4a-4c4b-a257-d538b623f6ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '737f1fc9-71b2-4500-94b0-67b85709c5be'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fmxo2z8xml93ohtg6b24wvfu8lqwr0gvmo2vgfplytalr6k5v0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bb0e9463-fcca-4a97-ad43-69c9bff72f21'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'uw6rrx6csmeuc6uyx3d8'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '3ff20a4c-8f91-4b8b-acf5-afcf2b0ede21'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '7isf03x3aeaidx1f68478ea9w134la6n8rbmq1wij6e6ybflu6n8aqilukifxebd2jpiip9lyd1yto3gg26s5o5kxch1zwti5q2u2njyt5h0er8jfzn6ljia5y986ghdrdc3g5x8jp7lwpbpjnmmjrn19wcq0evyop6rs19z2oj4kelvhm144vj3kjd66f5kfb2t1kmwff8ynkhfgdsgkv7x9imjltcw2d4dswve1q6u2g9pln6o7l1hvj8jv2z'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k8l6bp9fhfl2017exlc5r5vwscnll4gzcxbjkl9olxkxovnvmwvthpj5m14ctsi23zh45f8pwzkx69pxlrfirawh6rukljvuy464xe82rbjnm038mshubd6po0lcxu0ps5fkx94lyraqsxy5hgp6ubolcfr24cufb7ct236axlc2qsx2nydsarw72b8zblju5el62poy75pq470khurnfl3mppx5rkpy42s3a6gv81yq2vq396vz5vobbkwzf4b'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'i2el3tcl941ho1h2z4oncl9v6yc0twaogeji4p92hsi0cjq3c05wp0ad3xx9r52rjrbmu0d2nelb5tmqxinwhrly9ihrlmubpsxavzeavgatvxfu1958bt457u4sxeuac3irn5satjxv3qrkyhy5rzg8rqs5sju1domfm7vd32mirkfb0jn1kxyr7bw6iws8qxqs0oj639y8xjrt2lh82q6mcw4r2slcjiv5i85ciddcoxrzss3ls04rkfjn8ot'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'd0r5vetgu0jymmnh7ul3ed6953xlxe3hqkyzgospcw4nki5d9322tv54f8f81f7ajqqpum1wuxktqlpmmrmozq6l300h1bd0skgy6wt570hy7rou7z53z97s'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '124bh63o99zuftwwpo6ztws068pjtnsf631hykdyiangp5qw5s6hswqjpv29'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'dyacdijnbdgpb5s6c5g5ay979vj5y4neayycf4c2t4ziaaa51dcll7vwmqgv4y9x14tnjjsjwi37vgz3q6qx1lww0ytt4h5i50ztzoyiglowb95m2zz1jittts0kb8phqxe1mn50t46yxjy9zkpj9dgigt6k6qo1awrj6kg4mcy5ktwy2cvzfnu5o7n9ukahq91zbwpfz4lfmjt5w81oyc7sqzpb2lu4rumb12hic2iql3395k2gavmzwdx46z2'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 17:37:23'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 04:43:59'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 02:41:13'
    })
    deletedAt: string;
    
    
}
