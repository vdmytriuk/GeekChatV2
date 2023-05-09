import {ChatRoom} from "../../modules/ChatRoom/ChatRoom";
import PrivateLayout from "../../layouts/PrivateLayout/PrivateLayout";
import Rooms from "../../modules/Rooms/Rooms";
import AddRoom from "../../modules/AddRoom/AddRoom";

const HomePage = () => {
    return (
        <PrivateLayout aside={<Rooms/>}>
            <ChatRoom/>

            <AddRoom/>
        </PrivateLayout>
    );
};

export default HomePage;