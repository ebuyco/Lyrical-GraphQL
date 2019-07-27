// import React, { Component } from 'react';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

// class SongList extends Component {
//   /*eslint-disable*/
//   renderSongs() {
//     return this.props.data.songs.map((song) => {
//         return(
//             <li
//             className="collection-item"
//             key={song.id}>
//                 {song.title}
//             </li>
//         )
//     });
//   }

//   render() {
//     if (this.props.data.loading){
//         return (
//             <div>Loading.....</div>
//         )
//     }
//     return (
//       <>
//        {this.renderSongs()}
//       </>
//     );
//   }
// }

// const query = gql`
//     {
//         songs {
//             id
//             title
//         }
//     }

// `;
// export default graphql(query)(SongList);

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Spinner from './Spinner';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => (
      <li
        className='collection-item'
        key={song.id}
      >
        {song.title}
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return (
        <Spinner />
      );
    }
    return (
      <>
        {this.renderSongs()}
      </>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }

`;

export default graphql(query)(SongList);
