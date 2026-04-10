import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function BookCard({ workId }) {

  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error || !data) return <Error statusCode={404} />;

  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />

      <Card.Body>
        <Card.Title>{data.title ? data.title : ""}</Card.Title>
        <br/>
        <Card.Text>
          <strong>Published Date :</strong> {data.first_publish_date ? data.first_publish_date : "N/A"}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref >
          <Button variant="btn btn-outline-primary">View Book</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}