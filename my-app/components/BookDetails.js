import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react"; 
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {

    let updatedList;

    if (showAdded) {
      updatedList = await removeFromFavourites(workId);
    } else {
      updatedList = await addToFavourites(workId);
    }

    setFavouritesList(updatedList);
  };

  if (!book) return null;

  return (
    <Container className="my-4">
      <Row>

        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>

          {/* Description */}
          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <br />

          {/* Characters */}
          {book.subject_people && book.subject_people.length > 0 && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(", ")}
              <br /><br />
            </>
          )}

          {/* Settings */}
          {book.subject_places && book.subject_places.length > 0 && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(", ")}
              <br /><br />
            </>
          )}

          {/* Links */}
          {book.links && book.links.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {/* ✅ Favourite Button */}
          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "danger" : "primary"}
              onClick={favouritesClicked}
              className="mt-4"
            >
              {showAdded ? "Remove Favourite" : "+ Favourite"}
            </Button>
          )}

        </Col>
      </Row>
    </Container>
  );
}