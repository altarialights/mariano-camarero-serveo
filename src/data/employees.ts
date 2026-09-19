/**
 * ÚNICA FUENTE DE DATOS DE LAS TARJETAS.
 *
 * Cada objeto de este array genera automáticamente en `astro build`:
 *   · la tarjeta digital  →  /{companySlug}/{id}
 *   · su vCard            →  /{companySlug}/{id}.vcf
 *
 * Para añadir a una persona: copia un objeto, cambia los datos, deja su foto
 * en /public/employees/ y haz push. No hay que crear ningún archivo .astro.
 *
 * Los campos marcados con `?` son opcionales: si no existen, la interfaz y la
 * vCard simplemente los omiten.
 */

export interface EmployeeAddress {
    /** Calle y número. Ej.: "Calle Quintanavides 21, Edif. 5" */
    street: string;
    /** Línea adicional: parque empresarial, planta, oficina… */
    extra?: string;
    postalCode: string;
    city: string;
    /** Provincia / región (opcional). */
    region?: string;
    country: string;
}

export interface Employee {
    /** Slug de la persona en la URL. Solo minúsculas, números y guiones. */
    id: string;
    /** Slug de la empresa en la URL. Solo minúsculas, números y guiones. */
    companySlug: string;
    /** Nombre comercial de la empresa, tal y como debe aparecer. */
    company: string;

    firstName: string;
    /** Apellidos. */
    lastName: string;
    fullName: string;

    position: string;
    department?: string;

    /** Teléfono en formato internacional sin espacios (se usa en tel: y en la vCard). */
    phone: string;
    /** Teléfono tal y como se muestra en pantalla. Si falta, se usa `phone`. */
    phoneDisplay?: string;

    email: string;

    address?: EmployeeAddress;

    /**
     * Ruta de la fotografía dentro de /public. Ej.: "/employees/mariano-camarero.webp".
     * Si el archivo todavía no existe se muestra un monograma elegante con sus iniciales.
     */
    photo?: string;

    /** Ruta del logo dentro de /public. Se muestra siempre en blanco sobre naranja. */
    companyLogo: string;
}

export const employees: Employee[] = [
    {
        id: "mariano-camarero",
        companySlug: "serveo",
        company: "Serveo",

        firstName: "Mariano",
        lastName: "Camarero Hernández",
        fullName: "Mariano Camarero Hernández",

        position: "Quantity Surveyor",
        department: "Government Centro",

        phone: "+34648178182",
        phoneDisplay: "+34 648 178 182",

        email: "mcamarero@serveo.com",

        address: {
            street: "Calle Rosalind Franklin, 58",
            extra: "Getafe",
            postalCode: "28909",
            city: "Madrid",
            country: "España",
        },

        photo: "/employees/mariano-camarero.webp",

        companyLogo: "/companies/serveo/logo.png",
    },
];
