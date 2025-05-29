import { Professor, Tecnologia } from "../../types/main";

function listProfs(profs: Professor[]): string {
  const list = profs.map((prof) => `<li>${prof.nome} - sala ${prof.sala}</li>`);
  return `<ul>${list.join("")}</ul>`;
}

function listNodeJsTech(technologies: Tecnologia[]): string {
  const nodejs_tech_list = technologies.filter((tech) => tech.poweredByNodejs);
  const list = nodejs_tech_list.map(
    (tech) => `<li>${tech.name} - ${tech.type}</li>`
  );

  return `<ul>${list.join("")}</ul>`;
}

function add1(n: number): number {
  return n + 1;
}

export default exports.modules = {
  listProfs,
  listNodeJsTech,
  add1
};
