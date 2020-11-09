import { Module } from '@nestjs/common';
import { CoreModule } from './apps/core/core.module';
import { AdminModule } from './apps/admin/admin.module';
import { NfcModule } from './apps/nfc/nfc.module';

@Module({
    imports: [
        CoreModule,
        AdminModule,
        NfcModule,
    ]
})
export class AppModule {}
