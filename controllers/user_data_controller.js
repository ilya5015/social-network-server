class UserDataController {
  async getUser(req, res) {
    const query = req.query;
    res.status(200).json({ message: "get user", query });
  }

  async getUsers(req, res) {
    res.json("get users");
  }
}

export const userDataController = new UserDataController();
