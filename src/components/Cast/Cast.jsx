import Box from 'components/Box';
import { Author, Text } from 'components/Text/Text.styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, IMG_URL } from 'services/moviesApi';
import avatar from '../../images/avatar.jpg';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieCast(movieId)
        .then(setCast)
        .catch(error => console.log(error));
    }
  }, [movieId]);

  return (
    <Box py={4}>
      {cast && (
        <Box
          display="grid"
          gridGap={16}
          gridTemplateColumns="repeat(auto-fit, 200px)"
          as="ul"
        >
          {cast.map(({ id, name, profile_path: profileImg, character }) => {
            return (
              <Box mb={4} width={150} as="li" key={id}>
                <img
                  src={profileImg ? `${IMG_URL + profileImg}` : avatar}
                  alt={name}
                  width={100}
                />
                <Author>{name}</Author>
                <Text>Character: {character}</Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
export default Cast;
