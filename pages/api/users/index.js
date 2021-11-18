import { getAllUsers } from "../../../utils/users.dal";

export default async (req, res) => {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
};