import {useQuery} from "@tanstack/react-query";
import {getListaProduto} from "@/app/services/produtos";

export function useListaProdutos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["listaProdutos"],
    queryFn: () => getListaProduto()
  })
  return { produtos: data, isPending, isError };
}
