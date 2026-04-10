 import Card from 'react-bootstrap/Card';

 export default function PageHeader({text,subtext}){

    return(
        <>
    <Card className="pt-2 mt-4 mb-2 bg-light rounded-3 text-center border-0">
      <Card.Body>
        <h1 className='display-4'>{text}</h1>
        
        {subtext &&<p className="lead">{subtext}</p>}       
        </Card.Body>
    </Card>
    
    <br/>
    </>
    )
}