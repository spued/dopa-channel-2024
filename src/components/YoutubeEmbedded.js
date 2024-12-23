import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => {
  const stateChange = (evt) => {
    console.log(evt);
  };
  return (
    <div className='video-responsive'>
      <iframe
        id={embedId}
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${embedId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
        onLoad={stateChange}
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
