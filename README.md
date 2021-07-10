# Delilah Resto API

Todos los enpoints cuentan con un crud con las siguientes funciones en el controller:
.create, .readAll, .readOne, .delete, .update

.readOne, .delete y .update requieren que se pase el :id como parametro en la url.
.create y .readAll no reciben parametros en la url.
.readAll recibe parametros query con los siguientes criterios:
  - Se puede filtrar por cada campo. Si el campo es texto entonces filtra por like %query%, si no es texto entonces filtra por exactitud.
  - Los campos numericos y de fecha admiten maximos y minimos, por ejemplo: minPrecio, maxPrecio.
  - Por defecto no tiene limites pero acepta los parametros limit y offset