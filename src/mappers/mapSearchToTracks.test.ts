import mapSearchToTracks from "./mapSearchToTracks";

describe("mapSearchToTracks", () => {
  it("Should return valid mapped data", () => {
    // Arrange
    const track = mapSearchToTracks({
      tracks: {
        items: [{
          id: '1',
          'name': 'Track 1',
          'artists': [{
            name: 'artist 1'
          }],
          album: {
            images: [{
              url: 'http://someimge'
            }],
          },
          duration_ms: 10
        }]
      }
    })
    // Act
    // Assert
    expect(track[0]).toEqual({"id": "1", "artist": "artist 1", "cover_art": "http://someimge", "duration_ms": 10, "name": "Track 1"})
  });

  it("Should return valid mapped data for multiple artists", () => {
    // Arrange
    const track = mapSearchToTracks({
      tracks: {
        items: [{
          id: '1',
          'name': 'Track 1',
          'artists': [{
            name: 'artist 1'
          }, {
            name: 'artist 2'
          }],
          album: {
            images: [{
              url: 'http://someimge'
            }],
          },
          duration_ms: 10
        }]
      }
    })
    // Act
    // Assert
    expect(track[0]).toEqual({"id": "1", "artist": "artist 1, artist 2", "cover_art": "http://someimge", "duration_ms": 10, "name": "Track 1"})
  });
});