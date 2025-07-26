// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

const mockUser = {
  email: 'admin@tentwenty.com',
  password: 'Admin123',
  name: 'John Doe',
  token: 'dummy-token-abc123',
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === mockUser.email && password === mockUser.password) {
    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          name: mockUser.name,
          email: mockUser.email,
        },
        token: mockUser.token,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}
