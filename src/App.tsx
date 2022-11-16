import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Messenger from "./pages/Messenger";
import UserAuth from "./utils/UserAuth";
import RequireAuth from "./utils/RequireAuth";
import VideoCall from "./components/VideoCall";
import ReceiveCall from "./components/ReceiveCall"
// import { AnswerCall } from "./call";


const App: React.FC = () => {
  return (
    <UserAuth>
      <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Messenger />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/videocall/:callusername" element={<VideoCall />} />
          <Route path="/answercall/:answerusername" element={<ReceiveCall />} />
          {/* <Route path="/answercall/:answeruserid" element={<AnswerCall />} /> */}

      </Routes>
    </UserAuth>
  );
};

export default App;
