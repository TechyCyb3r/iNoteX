import Notes from './Notes';
const Home = ({showAlert}) => {

  return (
    <div className="container">
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;