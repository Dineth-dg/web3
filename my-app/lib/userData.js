import { getToken } from "./authenticate";

// GET FAVOURITES
export async function getFavourites(){

  try{

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites`,
      {
        headers:{
          "Authorization": `Bearer ${getToken()}`
        }
      }
    );

    if(res.status === 200){
      return await res.json();
    }else{
      return [];
    }

  }catch(err){
    return [];
  }
}

// ADD TO FAVOURITES
export async function addToFavourites(id){

  try{

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
      {
        method: "PUT",
        headers:{
          "Authorization": `Bearer ${getToken()}`
        }
      }
    );

    if(res.status === 200){
      return await res.json();
    }else{
      return [];
    }

  }catch(err){
    return [];
  }
}

// REMOVE FROM FAVOURITES
export async function removeFromFavourites(id){

  try{

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
      {
        method: "DELETE",
        headers:{
          "Authorization": `Bearer ${getToken()}`
        }
      }
    );

    if(res.status === 200){
      return await res.json();
    }else{
      return [];
    }

  }catch(err){
    return [];
  }
}