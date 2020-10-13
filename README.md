yarn typeorm migration:create -n create_orphanages
yarn typeorm migrations:create -n create_imagens

yarn typeorm migration:run

yarn typeorm migration:revert


 No tsconfig.json
 
 strictPropertyInitialization = false
 
/* Experimental Options */
"experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
"emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
