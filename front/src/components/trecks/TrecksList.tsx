import type { Treck } from "../../types";
import TreckItem from "./TreckItem";
import List from "@mui/material/List";


interface Props {
    trecks: Treck[];
    isLoading: boolean;
    isError: boolean
}


const TrecksList: React.FC<Props> = ({ trecks, isLoading, isError }) => {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {trecks.map((treck) => (
          <TreckItem key={treck._id} treck={treck} />
        ))}
      </List>
    );
};


export default TrecksList;