//************************************************************************************************************/
//************************************************************************************************************/
//*******************************SCRIPT EFECTOS PRECIOS EN MOVIMIENTO EPM0002 *********************************/
//************************************************************************************************************/
//************************************************************************************************************/

// Hacer una solicitud a la API de CoinGecko para obtener los datos de las top 20 criptomonedas
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    // Obtener solo los primeros 20 elementos de la respuesta
    const cryptos = data.slice(0, 20);

    // Función para crear elementos HTML para cada criptomoneda
    function crearPrecioElemento(crypto) {
      const precioElemento = document.createElement('div');
      precioElemento.classList.add('EPM0002-precio');

      // Crear elemento de imagen para el icono de la criptomoneda
      const iconoElemento = document.createElement('img');
      iconoElemento.src = crypto.image;
      iconoElemento.alt = crypto.name;
      iconoElemento.style.maxWidth = '18px'; // Establecer tamaño máximo de la imagen
      precioElemento.appendChild(iconoElemento);

      // Agregar nombre y precio de la criptomoneda
      const nombrePrecioTexto = document.createElement('span');
      nombrePrecioTexto.textContent = `${crypto.name}: $${crypto.current_price}`;
      precioElemento.appendChild(nombrePrecioTexto);

      return precioElemento;
    }

    const preciosContainer = document.getElementById('EPM0002-prices-container');

    // Agregar cada precio al contenedor y calcular el ancho total
    let totalWidth = 0;
    cryptos.forEach(crypto => {
      const precioElemento = crearPrecioElemento(crypto);
      preciosContainer.appendChild(precioElemento);
      totalWidth += precioElemento.offsetWidth;
    });

    // Calcular la anchura del contenedor para mostrar precios por la derecha
    preciosContainer.style.width = `${totalWidth}px`;

    // Mover los precios de manera uniforme
    let desplazamiento = 0;
    function moverPrecios() {
      desplazamiento--;
      preciosContainer.style.transform = `translateX(${desplazamiento}px)`;

      // Cuando los precios se desplazan completamente fuera del contenedor, los reposiciona
      if (desplazamiento <= -totalWidth) {
        desplazamiento = preciosContainer.offsetWidth;
      }

      // Continuar la animación
      requestAnimationFrame(moverPrecios);
    }

    // Iniciar el movimiento de los precios
    moverPrecios();
  })
  .catch(error => {
    console.error('Error al obtener los datos de la API:', error);
  });
