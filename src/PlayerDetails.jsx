import { useParams } from "react-router-dom";

const PlayerDetails = () => {
  const { id } = useParams();

  return <h1>{id}</h1>;
};

export default PlayerDetails;
