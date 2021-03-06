// function para abrir y cerrar el navbar
const openNavbar = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('is-active');
}

// whatsapp button
tippy('#whatsapp', {
    content: `
    <div>
        <a href="https://wa.me/51946182531" target="_blank" class="button is-extra">
            <i data-icon="person"></i> Publicista Victor
        </a>
    </div>
    <div class="mg-top">
        <a href="https://wa.me/51992858949" target="_blank" class="button is-extra">
            <i data-icon="person"></i> Publicista Angel
        </a>
    </div>
    `,
    allowHTML: true,
    interactive: true,
    delay: [null, 300],
    trigger: 'click',
    theme: 'whatsapp'
});

let gallery;
let previewImage;
if (document.getElementById('images')) {
    gallery = new Viewer(document.getElementById('images'));
}

previewImage = (id) => {
    document.getElementById(`image${id}`).click();
}

const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

ScrollReveal().reveal('.reveal', { delay: 500 });

if (window.innerWidth > 1024) {
    window.onscroll = (e) => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.backgroundColor = '#18904A';

            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                document.getElementById('top').classList.add('is-active');
            }
        } else {
            document.getElementById("navbar").style.backgroundColor = 'transparent';
            document.getElementById('top').classList.remove('is-active');
        }
    }
}

const consultar = (name) => {
    window.open(`https://wa.me/51946182531?text=Hola, quisiera consultar sobre ${name}`, '_blank');
}

class Precios {
    static type = null;
    static getFiles() {

    }
    static setType(newType) {
        this.type = newType;

        const variantes = {
            banner: [
                {
                    name: 'Estructura',
                    price: 30
                },
                {
                    name: 'Instalacion',
                    price: 70
                }
            ],
            luminoso: [
                {
                    name: '1 cara',
                    price: 160
                },
                {
                    name: '2 caras',
                    price: 180
                },
                {
                    name: 'Instalacion',
                    price: 70
                }
            ],
            vinil: [
                {
                    name: 'Laminado o troquelado',
                    price: 69
                },
                {
                    name: 'Laminado + troquelado',
                    price: 102
                }
            ]
        }

        const container = document.getElementById('especificaciones');
        let content = '';

        if (newType in variantes) {
            content = '<h2>Especificaciones</h2>';
            for (const esp of variantes[newType]) {
                content += `<label><input type="checkbox" value="${esp.price}::${esp.name}">&nbsp;${esp.name}</label><br>`;
            }
        }

        container.innerHTML = content;
    }
    static send(event) {
        event.preventDefault();

        const tipos = {
            banner: {
                name: 'Banner',
                price: 30
            },
            lona: {
                name: 'Impresion lona',
                price: 40
            },
            vinil: {
                name: 'Impresion vinil',
                price: 47
            }
        }

        let datos = '';
        let precio = 0;

        // tipo
        const tipo = document.querySelector('#type input:checked').value;

        const alto = document.getElementById('alto').value;
        const ancho = document.getElementById('ancho').value;

        const especificaciones = document.querySelectorAll('#especificaciones input:checked');

        let especificacionesPrice = 0;

        for (const especificacion of especificaciones) {
            let especificacionesSplit = especificacion.value.split('::');
            especificacionesPrice += parseInt(especificacionesSplit[0]);
        }

        if (tipo in tipos) {
            let tipoObj = tipos[tipo];
            let tipoTotalPrice = tipoObj.price + parseInt(especificacionesPrice);
            let tipoPrice = (parseFloat(alto) * parseFloat(ancho)) * tipoTotalPrice;
            precio += tipoPrice;
        } else {
            precio = (parseFloat(alto) * parseFloat(ancho)) * especificacionesPrice;
        }

        // se agrega un 20% de ganancias
        precio = precio = ((20 / 100) * precio) + precio;

        precio = Number((precio).toFixed(1));

        // alert(`Precio aproximado: ${precio} soles`);

        Swal.fire(
            {
                title: 'Precio aproximado',
                text: `S/. ${precio}`,
                confirmButtonText: 'Cerrar'
            }
        )
    }
}

if (document.getElementById('brand')) {
    var typed = new Typed('#brand', {
        strings: ["Publicidad", "Marketing", "Sitios web"],
        typeSpeed: 95,
        showCursor: true,
        loop: true
    });
}