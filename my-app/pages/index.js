/******************************************************************************** 
*  WEB422 – Assignment 02 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name:Ileperuma Achchige Dineth Damishka Gunarathna         Student ID: 130673247            Date: 03/13/2026 
* 
********************************************************************************/ 

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data) => {
    router.push({
      pathname: '/books',
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
      )
    });
  };

  return (
    <>
      <PageHeader text="Search Books" subtext  ="Find books using OpenLibrary" />

      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                {...register("author", { required: true })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && (
                <div className="invalid-feedback">Author is required</div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="formLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength="3"
                {...register("language")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formPublishYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button type="submit" variant="primary" className="w-100 py-3 fs-5">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}