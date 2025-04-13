# backend-up-2025
Repo del backend para la materia de Full Stack Web Development


# Consigna
Se requiere generar un sistema de gestión de alquiler de productos de playa para un parador en el caribe.

El parador cuenta con los siguientes productos para alquilar:

- JetSky
- Cuatriciclos
- Equipo de buceo
- Tablas de surf (para niños y para adultos)

Para el caso del alquiler de JetSky o cuatriciclos se deberá requerir el alquiler de casco y el jetsky un chaleco salvavidas (en ambos casos se pueden subir máximo 2 personas), por lo que se alquilará uno o dos dispositivos de seguridad según corresponda.

La duración del alquiler para cualquiera de los productos es de 30 minutos por turno y un mismo cliente puede adquirir hasta 3 turnos consecutivos.

En el caso de contratar mas de un producto, se considerará un descuento del 10% en el total a pagar.

Los turnos se pueden tomar con una anticipación no mayor a 48 hs y  podrán cancelarse sin costo hasta 2 horas del turno.

Se puede realizar el pago en el parador (efectivo) en ese caso este se deberá realizar 2 horas antes del turno de lo contrario el mismo se libera.

Se puede pagar en moneda local o bien en moneda extranjera.

Seguro de tormenta, en caso que el usuario no pueda disfrutar de su turno debido a una tormenta imprevista se le devolverá el 50% del valor abonado.

# Modelado de la base de datos

[![](https://mermaid.ink/img/pako:eNqlVVtv2jAU_iuWHytACSG0y1tXXpC2FQ2epkiViQ_gEdupL1IzBL99TkggWaC0Wh6Sk_Pl3D-f7HAiKeAIJynResLIWhEeC-SuUoOerDaSg0K7o7a4npe_ITFTil4YPWvnRjGxRoJw6CiBE5Z2tNlGisa30_nzhBhAiQL3oI_mCO2b6cyUpDYx_5dN4tyvpcrPwA_Ll67GTLEEZqAWVokOyMnbDGSWNvx9lTIFIpCCV8sU6DlZgck_V9HRZmqAf7gok2fwgdxbYVyq28L2ZoyTNqkmP6U3C2pC2hBlFox3MzQuM93RartcSEPSDkCZTqQV5qfzehV85KYbp-2uaprLy1h9oRQiEkgnQGjKLrExI3kX_Ma0OVQtLUZ3QMzd9fW-X51vdiR0s8lVGa-WCMOadGpGPdPmgPRJfieDGzw7-7iZSvtAkpyDMJ_g1bLqCL3Ua9biVBWe8GLU3WNslQKR5B2Ag9lI-i4DXA1H4bTfYuzHGPX7TvAGgzsn10cmckd_C5Vhrbz6ednhCG2IbnKiCcb4rjYtfNQrLXJrZAXqosGVWI2ZRkgA0LZxA_4nZsvwQtgLIetBl6XFAvfwWjGKI6Ms9LDroFvx7hWXRIix2YBbAThyIiVqG-NY7J1NRsQvKXltpqRdb3C0Iql2bzajjgXVT-ikdTOmoJ4KCuAoDIPSCY52-A1HfjAchKOx74_DcBTcj_yHHs5x1A9Cf-A9-OFw-HD_ZRiMRvse_lPG9QdBGHq-54de4IXjse_8AWVGqu_Vj7B47P8CqQko1w?type=png)](https://mermaid.live/edit#pako:eNqlVVtv2jAU_iuWHytACSG0y1tXXpC2FQ2epkiViQ_gEdupL1IzBL99TkggWaC0Wh6Sk_Pl3D-f7HAiKeAIJynResLIWhEeC-SuUoOerDaSg0K7o7a4npe_ITFTil4YPWvnRjGxRoJw6CiBE5Z2tNlGisa30_nzhBhAiQL3oI_mCO2b6cyUpDYx_5dN4tyvpcrPwA_Ll67GTLEEZqAWVokOyMnbDGSWNvx9lTIFIpCCV8sU6DlZgck_V9HRZmqAf7gok2fwgdxbYVyq28L2ZoyTNqkmP6U3C2pC2hBlFox3MzQuM93RartcSEPSDkCZTqQV5qfzehV85KYbp-2uaprLy1h9oRQiEkgnQGjKLrExI3kX_Ma0OVQtLUZ3QMzd9fW-X51vdiR0s8lVGa-WCMOadGpGPdPmgPRJfieDGzw7-7iZSvtAkpyDMJ_g1bLqCL3Ua9biVBWe8GLU3WNslQKR5B2Ag9lI-i4DXA1H4bTfYuzHGPX7TvAGgzsn10cmckd_C5Vhrbz6ednhCG2IbnKiCcb4rjYtfNQrLXJrZAXqosGVWI2ZRkgA0LZxA_4nZsvwQtgLIetBl6XFAvfwWjGKI6Ms9LDroFvx7hWXRIix2YBbAThyIiVqG-NY7J1NRsQvKXltpqRdb3C0Iql2bzajjgXVT-ikdTOmoJ4KCuAoDIPSCY52-A1HfjAchKOx74_DcBTcj_yHHs5x1A9Cf-A9-OFw-HD_ZRiMRvse_lPG9QdBGHq-54de4IXjse_8AWVGqu_Vj7B47P8CqQko1w)
