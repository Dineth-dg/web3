import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

import { registerUser } from "@/lib/authenticate";

export default function Register(){

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();

    try{

      await registerUser(user, password, password2);

      router.push("/login"); // ✅ redirect to login

    }catch(err){
      setWarning(err.message);
    }
  }

  return(
    <>
      <PageHeader
        text="Register"
        subtext="Register for an account"
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

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e)=>setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Register</Button>

      </Form>
    </>
  );
}