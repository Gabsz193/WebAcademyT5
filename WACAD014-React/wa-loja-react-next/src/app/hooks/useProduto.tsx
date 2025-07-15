import {useQuery} from "@tanstack/react-query";
import {getProduto} from "@/app/services/produtos";

export function useProduto(produtoName: string) {
  const {data, isError, isPending} = useQuery({
    queryKey: ["getProduto"],
    queryFn: () => getProduto(produtoName)
  })

  return {produto: data, isPending, isError}
}
