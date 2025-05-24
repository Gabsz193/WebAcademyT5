import { Request, Response, Router } from "express";
import { LoremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (req : Request, res: Response) => {
    res.send("Hello World");
})

router.get("/lorem", (req : Request, res: Response) => {
    res.send("URL inválida, por favor, forneça um número de parágrafos. Ex.: /lorem/2");
})

router.get("/lorem/:qtd_paragrafos", (req: Request, res: Response) => {    
    const qtd_paragrafos = parseInt(req.params['qtd_paragrafos']);

    const lorem = new LoremIpsum();

    const generated_paragraphs = lorem.generateParagraphs(qtd_paragrafos).split('\n');

    const html = generated_paragraphs.map((p) => {
        return `<p>${p}</p>`
    }).join("");

    res.send(html);
})

export default router;