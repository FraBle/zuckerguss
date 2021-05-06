import { Configure, DocumentVideo, Home, Video, Car } from "grommet-icons";

export default Object.freeze({
  HOME: {
    id: "home",
    route: "/",
    icon: <Home />,
  },
  RECORDINGS: {
    id: "recordings",
    route: "/recordings",
    icon: <DocumentVideo />,
  },
  STREAM: {
    id: "stream",
    route: "/stream",
    icon: <Video />,
  },
  CARINFO: {
    id: "carinfo",
    route: "/carinfo",
    icon: <Car />,
  },
  SYSTEMINFO: {
    id: "systeminfo",
    route: "/systeminfo",
    icon: <Configure />,
  },
});
