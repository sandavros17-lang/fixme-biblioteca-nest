import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AutorModule } from './autor/autor.module.js';
import { CategoriaModule } from './categoria/categoria.module.js';
import { LibroModule } from './libro/libro.module.js';
import { SocioModule } from './socio/socio.module.js';
import { PrestamoModule } from './prestamo/prestamo.module.js';

@Module({
  imports: [
    PrismaModule,
    AutorModule,
    CategoriaModule,
    LibroModule,
    SocioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
