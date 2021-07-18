import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const PERCENTAGE = 0.07;

  switch (method) {
    case "POST":
      const { bag1, bag2 } = req.body;

      const difference = bag1.sum_xp * PERCENTAGE;

      const maxDifference = bag1.sum_xp + difference;
      const minDifference = bag1.sum_xp - difference;

      if (bag2.sum_xp >= minDifference && bag2.sum_xp <= maxDifference) {
        return res.status(200).json({ message: "Troca justa!" });
      } else {
        return res.status(200).json({ message: "Troca injusta!" });
      }

      break;

    case "GET":
      res.status(200).json({ message: "Podemos listar" });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("Method not allowed");
      break;
  }
};
