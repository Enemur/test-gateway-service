import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from './core/service/config.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [CoreModule],

      useFactory: async (configService: ConfigService) => {
        return {
          debug: configService.isGraphQLDebugEnabled,
          playground: configService.isGraphQLPlaygroundEnabled,
          autoSchemaFile: 'schema.graphql',
          installSubscriptionHandlers: true,
        } as GqlModuleOptions;
      },

      inject: [ConfigService],
    }),

    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
