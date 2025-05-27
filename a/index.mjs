import { greeting } from "c";

export const wrapsGreeting = (name) => {
  console.log("wrapsGreeting called")
  return greeting(name);
}