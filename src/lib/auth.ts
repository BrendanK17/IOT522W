export const users = [
    { email: "customer@example.com", password: "customer123", role: "customer" },
    { email: "foodprep@example.com", password: "foodprep123", role: "food-prep-staff" },
    { email: "delivery@example.com", password: "delivery123", role: "delivery-staff" },
];
  
export const login = (email: string, password: string) => {
    return users.find((user) => user.email === email && user.password === password);
};

export const signup = (email: string, password: string, role: string): string => {
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return "User already exists"
    }
    users.push({ email, password, role })
    return "User created successfully"
  }