import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    req.query.password === "secret"
        ? res.status(200).send("")
        : res.status(403).send("");
};