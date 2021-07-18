import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { fauna } from "../../services/fauna";

type Bag = {
  sum_xp: number;
  pokemon: [{ name: string; base_experience: number }];
};
type Trade = {
  ts: string;
  data: {
    status: string;
    bag1: Bag[];
    bag2: Bag[];
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const PERCENTAGE = 0.07;

  switch (method) {
    case "POST":
      const { bag1, bag2 }: { bag1: Bag; bag2: Bag } = req.body;

      const difference = bag1.sum_xp * PERCENTAGE;

      const maxDifference = bag1.sum_xp + difference;
      const minDifference = bag1.sum_xp - difference;

      let tradeStatus = "";

      if (bag2.sum_xp >= minDifference && bag2.sum_xp <= maxDifference) {
        tradeStatus = "Troca justa!";
      } else {
        tradeStatus = "Troca injusta";
      }

      const trade = await fauna.query<Trade>(
        q.Create(q.Collection("trades"), {
          data: {
            bag1,
            bag2,
            status: tradeStatus,
          },
        })
      );
      return res.status(200).json(trade.data);

    case "GET":
      const trades = await fauna.query<Trade>(
        q.Map(
          q.Paginate(q.Match(q.Index("all_trades"))),
          q.Lambda("TRADE", q.Get(q.Var("TRADE")))
        )
      );
      res.status(200).json(trades);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("Method not allowed");
      break;
  }
};
