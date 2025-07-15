import {useQuery} from "@tanstack/react-query";
import {getFavoritos} from "@/app/services/produtos";

export default function useListaFavoritos() {
  const { data, isPending, isError, refetch } = useQuery({
    queryFn: () => getFavoritos(),
    queryKey: ["listaFavoritos"]
  })

  return { favoritos: data, isPending, isError, refetchFavoritos: refetch };
}
