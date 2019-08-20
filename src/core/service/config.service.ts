import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string | undefined;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const error = dotenv.config().error;
    this.envConfig = this.validateInput(process.env);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      BASE_PATH: Joi.string()
        .allow('')
        .default(''),
      PORT: Joi.number().default(3000),
      SWAGGER_ENABLED: Joi.boolean().default(false),
      GQL_DEBUG: Joi.boolean().default(false),
      GQL_PLAYGROUND: Joi.boolean().default(false),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      { allowUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get basePath(): string {
    return String(this.envConfig.BASE_PATH);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get isSwaggerEnabled(): boolean {
    return Boolean(this.envConfig.SWAGGER_ENABLED);
  }

  get isGraphQLDebugEnabled(): boolean {
    return Boolean(this.envConfig.GQL_DEBUG);
  }

  get isGraphQLPlaygroundEnabled(): boolean {
    return Boolean(this.envConfig.GQL_PLAYGROUND);
  }
}
