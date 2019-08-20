import { Module } from '@nestjs/common';
import { ConfigService } from './service/config.service';
import { TerminusOptionsService } from './service/terminus-options.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CoreModule {}
