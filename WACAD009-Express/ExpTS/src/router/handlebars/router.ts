import { Request, Response, Router } from "express";
import { Professor } from "../../types/main";

const router = Router();

router.get("/hb1", (req: Request, res: Response) => {
  res.render("hb1", {
    mensagem: "Olá, você está aprendendo Express + HBS!",
    layout: false
  });
});

router.get("/hb2", (req: Request, res: Response) => {
  res.render("hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: false
  });
});

router.get("/hb3", (req: Request, res: Response) => {
  const profes: Professor[] = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 }
  ];

  res.render("hb3", {
    profes: profes,
    layout: false
  });
});

export default router;
