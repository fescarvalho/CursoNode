import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Falha na validação!' });
    }
    const { email } = req.body;
    let user = await User.findOne({ email });

    // verificando se existe usuario
    if (!user) user = await User.create({ email });
    return res.json(user);
  }
}

export default new SessionController();
