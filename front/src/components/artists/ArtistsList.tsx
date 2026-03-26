import { Box } from "@mui/material";
import ArtistsItem from "./ArtistsItem";
import Spinner from "../UI/Spinner";
import type { Artist } from "../../types";

interface Props {
  artistsList: Artist[],
  isLoading: boolean
}

const ArtistsList: React.FC<Props> = ({ artistsList, isLoading }) => {
  return (
    <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
      {isLoading && <Spinner />}
      {artistsList.map((artist) => (
        <ArtistsItem key={artist._id} artist={artist} />
      ))}
    </Box>
  );
};

export default ArtistsList