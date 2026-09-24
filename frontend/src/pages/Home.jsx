import Navbar from "../components/Navbar";
import TaskManager from "../components/Tasks";

const Home = () => {
  return (
    <div className="bg-pink-50">
        <Navbar/>
        <div className="w-full">
        <TaskManager/>
        </div>
    </div>
  )
}

export default Home;
