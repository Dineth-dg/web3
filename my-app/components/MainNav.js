import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {

  const router = useRouter();
  const token = readToken();

  const logout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>

          <Navbar.Brand as={Link} href="/">
            Ileperuma Achchige Dineth Damishka Gunarathna
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {token && (
            <Nav>
              <NavDropdown title={token.userName} id="user-dropdown">

                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}

        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}