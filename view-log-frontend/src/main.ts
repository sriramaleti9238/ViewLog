import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ConfigService } from './app/core/services/config.service';


async function bootstrap() {
  const configService = new ConfigService();
  await configService.load();   // Load /config.json at runtime

  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      { provide: ConfigService, useValue: configService }
    ]
  });
}

bootstrap().catch(err => console.error(err));
