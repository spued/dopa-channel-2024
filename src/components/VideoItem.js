import YoutubeEmbed from "./YoutubeEmbedded";

const VideoItem = ({ data }) => {
  //console.log(data.snippet.thumbnails.default.url);
  return (
    <div className='video__thumb'>
      <div className='video__title'>{data.snippet.title}</div>
      <YoutubeEmbed embedId={data.snippet.resourceId.videoId} />
    </div>
  );
};
export { VideoItem as default };
