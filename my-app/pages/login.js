import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Login(){

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const router = useRouter();

  async function updateAtom(){
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e){
    e.preventDefault();

    try{

      await authenticateUser(user, password);

      await updateAtom(); // ✅ IMPORTANT

      router.push("/");

    }catch(err){
      setWarning(err.message);
    }
  }

  return(
    <>
      <PageHeader
        text="Login"
        subtext="Login to your account"
      />

      {warning && <Alert variant="danger">{warning}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e)=>setUser(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Login</Button>

      </Form>
    </>
  );
}