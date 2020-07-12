import getSpotifyAuthToken from "../utils/getSpotifyAuthToken";
import { SpotifyAccessToken } from "../types/spotifyAuth";

const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const MOCK_TOKEN_STORE: SpotifyAccessToken = { access_token: 'x', expires: 3000 };


describe("getSpotifyAuthToken", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  }); 

  it("Should return token from local storage when it exists", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(JSON.stringify(MOCK_TOKEN_STORE));
    // Act
    const token = getSpotifyAuthToken();
    // Assert
    expect(token).toEqual(MOCK_TOKEN_STORE.access_token);
  });

  it("Should parse and return the token from the hash url", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(undefined);
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#access_token=xxxxxx&expires=2000'
      }
    });
    // Act
    const token = getSpotifyAuthToken();
    // Assert
    expect(token).toEqual('xxxxxx');

  }); 
});