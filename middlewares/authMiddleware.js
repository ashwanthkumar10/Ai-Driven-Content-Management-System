import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('this is the auth header', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('this is the token', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    console.log('this is the decoded token', decoded);

    req.user = decoded; // { userId, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
