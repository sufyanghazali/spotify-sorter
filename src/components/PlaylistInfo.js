import SortButton from "./SortButton";
import SaveButton from "./SaveButton";

const PlaylistInfo = ({
  playlist,
  onSortButtonClicked,
  onSaveButtonClicked,
  isSorted,
}) => {
  if (playlist)
    return (
      <>
        <div className="flex p-12">
          <div className="w-48 mr-8">
            <img src={playlist.images[0].url} alt={playlist.name}></img>
          </div>
          <div className="flex flex-col h-48 justify-between">
            <h2 className="text-8xl text-white font-bold tracking-tight">
              {playlist.name}
            </h2>
            <div className="">
              <SortButton onClick={onSortButtonClicked} />
              {!isSorted && <SaveButton onClick={onSaveButtonClicked} />}
            </div>
          </div>
        </div>
      </>
    );
};

export default PlaylistInfo;
