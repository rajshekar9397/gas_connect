import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// POST /register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    console.log('Existing user Check:', existingUser);
    // console.log('res Check:', res.status);
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
    } else {

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // ⚠️ Hash this in production!
        phone
      },
    });

    console.log('Registering user:', newUser);

    res.status(200).json({ message: 'Registration successful!', user: newUser })
  };
  
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed due to server error' });
  }
});

// POST /login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // console.log('Logging in user:', user.email);
    if (!user|| user.password !== password) {
      res.status(401).json({ error: 'Invalid email or password' });
    }
    else {

    console.log('Logging in user:', email);

    res.status(200).json({ message: 'Login successful!' });
  };
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed due to server error' });
  }
});

export default router;
