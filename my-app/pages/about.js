import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL453657W.json");

  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}
export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer" subtext="Ileperuma Achchige Dineth Damishka Gunarathna" />

          <p>
            Hi, my name is Dineth Gunarathna. I am a student developer with a
            strong interest in web development and modern JavaScript frameworks
            such as Next.js and React.
          </p>

          <p>
            The book displayed below is one of my selections from the Open
            Library API. This page demonstrates how static site generation can
            be used to fetch and display external API data at build time.
          </p>

          <BookDetails book={props.book} workId="OL453657W" showFavouriteBtn={false} />
    </>
  );
}
