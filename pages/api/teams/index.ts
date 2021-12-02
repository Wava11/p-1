import { getAllTeams } from "../../../entities/team/teams.dal";


export default async (req, res) => {
    const allTeams = await getAllTeams();
    
    res.status(200).json(allTeams);
};