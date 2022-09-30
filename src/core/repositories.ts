import { useQuery } from "react-query";
import { Todo } from "./entities";
import { ApiClient } from "./lib/api-client";

export const useGetTodo = () => {
  return useQuery<Todo>("todos", () => {
    return ApiClient.get("https://jsonplaceholder.typicode.com/todos/1");
  });
};

export const useGetUser = () => {
  return useQuery("user", () =>
    ApiClient.get("https://api.dev.vermietet.de/usages/micro/non-existent")
  );
};
