import Notes from "../components/Notes"
import Addnote from "./Addnote"


function Home(props) {
    const {showAlert} = props;
    return (<div className="container">
        <Addnote showAlert={showAlert} />
        <Notes showAlert={showAlert}/>
        </div>
    )
}

export default Home
