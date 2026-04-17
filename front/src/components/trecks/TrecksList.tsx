import type { Treck } from "../../types";
import TreckItem from "./TreckItem";
import List from "@mui/material/List";


interface Props {
  trecks: Treck[];
  deleteFunc: (id: string) => void;
  publicateFunc: (id: string) => void;
}


const TrecksList: React.FC<Props> = ({ trecks, deleteFunc, publicateFunc }) => {

    return (
      <List sx={{ width: "100%", maxWidth: 520, bgcolor: "background.paper" }}>

        {trecks.map((treck) => (
          <TreckItem
            key={treck._id}
            deleteFunc={deleteFunc}
            publicateFunc={publicateFunc}
            treck={treck}
          />
        ))}
      </List>
    );
};


export default TrecksList;