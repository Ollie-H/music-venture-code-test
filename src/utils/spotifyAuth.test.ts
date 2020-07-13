import spotifyAuth from "../utils/spotifyAuth";
import { SpotifyAccessToken } from "../types/spotifyAuth";

const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const mockTimestamp = 1466424490000;
const MOCK_TOKEN_STORE: SpotifyAccessToken = { access_token: 'x', expires_in: mockTimestamp + 3000 };
const mockDate = new Date(mockTimestamp)
jest
  .spyOn(global, 'Date')
  // @ts-ignore
  .mockImplementation(() => mockDate)

describe("spotifyAuth", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  }); 

  afterAll(() => {
    jest.resetAllMocks();
  }); 

  it("Should return token from local storage when it exists", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(null);
    // Act
    const token = spotifyAuth.getToken();
    // Assert
    expect(token).toEqual(undefined);
  });

  it("Should return token from local storage when it exists", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(JSON.stringify(MOCK_TOKEN_STORE));
    // Act
    const token = spotifyAuth.getToken();
    // Assert
    expect(token).toEqual(MOCK_TOKEN_STORE.access_token);
  });

  it("Should return undefined if token is expired", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(JSON.stringify({ access_token: 'x', expires_in: mockTimestamp - 1000 }));
    // Act
    const token = spotifyAuth.getToken();
    // Assert
    expect(token).toEqual(undefined);
  });

  it("Should parse and return the token from the hash url", () => {
    // Arrange
    getItemSpy.mockReturnValueOnce(undefined);
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#access_token=xxxxxx&expires_in=2000'
      }
    });
    // Act
    spotifyAuth.setTokenFromUrl();
    // Assert
    expect(setItemSpy).toBeCalledWith("spotify-token", "{\"access_token\":\"xxxxxx\",\"expires_in\":1466426490000}");
  }); 
});