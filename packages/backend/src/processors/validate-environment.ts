import { Entity } from "@backstage/catalog-model";
import { CatalogProcessor } from "@backstage/plugin-catalog-node";
import { z } from 'zod';

const EntityWithEnums = z.object({
  spec: z.object({
    environment: z.enum(['test', 'dev', 'prod'])
  })
})

export class ValidateEnvironment implements CatalogProcessor {
  getProcessorName(): string {
    return 'ValidateEnvironment'
  }

  async validateEntityKind(entity: Entity) {
    if (entity.kind.toLocaleLowerCase() === 'component') {
      try {
        EntityWithEnums.parse(entity);
      } catch (e) {
        throw e;
      }
      return true;
    }
    return false;
  }
}