import type { APIRoute, GetStaticPaths } from "astro";
import type { Employee } from "../../data/employees";
import { allEmployees, cardPath } from "../../lib/employees";
import { buildVCard } from "../../lib/vcard";

/**
 * vCard 3.0 por empleado → /{companySlug}/{id}.vcf
 * Se genera en build desde el MISMO objeto que la página.
 * En producción (Vercel) las cabeceras las fija vercel.json.
 */
export const getStaticPaths = (() =>
  allEmployees.map((employee) => ({
    params: { company: employee.companySlug, slug: employee.id },
    props: { employee },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ employee: Employee }> = async ({ props, site }) => {
  const { employee } = props;
  const cardUrl = site ? new URL(cardPath(employee), site).href : undefined;
  const body = await buildVCard(employee, cardUrl);

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${employee.id}.vcf"`,
    },
  });
};
