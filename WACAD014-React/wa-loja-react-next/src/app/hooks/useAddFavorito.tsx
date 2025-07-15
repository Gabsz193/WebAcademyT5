import {useMutation} from "@tanstack/react-query";
import {addProductFavorito} from "@/app/services/produtos";
import {Produto} from "@/types/produto";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
  const {mutate, isPending} = useMutation({
    mutationFn: (produto: Produto) => addProductFavorito(produto),
    onSuccess,
    onError,
  })
  return {addFavorito: mutate, isPending};
}
