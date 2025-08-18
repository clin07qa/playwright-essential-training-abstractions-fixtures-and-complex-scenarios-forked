import { request, expect } from "@playwright/test";

export async function registerUser(email: string, password: string) {
  const apiUrl = process.env.API_URL
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(apiUrl+"/users/register", {
    data: {
    first_name: "Test",
    last_name: "User",
    dob: "2001-01-01",
    phone: "5555555",
    email: email,
    password: password,
    address: {
      street: "101 Testing Way",
      city: "New York",
      state: "New York",
      postal_code: "12345"
      }
    }
  });

  expect(response.status()).toBe(201);
  return response.status();
};