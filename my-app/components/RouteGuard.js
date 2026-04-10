import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard(props) {

  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  
  const PUBLIC_PATHS = ["/login", "/register", "/about"];

  
  async function updateAtom() {
    try {
      const favs = await getFavourites();
      setFavouritesList(favs);
    } catch (err) {
      setFavouritesList([]);
    }
  }

  useEffect(() => {

      updateAtom();


    const token = localStorage.getItem("access_token");

    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push("/login");
    }

  }, [router.pathname]);

  return props.children;
}