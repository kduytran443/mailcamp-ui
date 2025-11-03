import { Box } from "@mui/material";
import ApiFetcher from "api/ApiFetcher";
import { getSimpleClasses } from "api/class/ClassApi";
import ClassGallery from "components/ClassGallery";

export function HomeView() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <>
            <ApiFetcher fetchData={ getSimpleClasses }>
              {(itemList, loading, error) => <ClassGallery items={itemList} error={error} loading={loading} />}
            </ApiFetcher>
          </>
      </Box>
    </Box>
  );
}
