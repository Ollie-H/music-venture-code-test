import useFetch from "./useFetch";
import axios from "axios";
import { renderHook, act } from '@testing-library/react-hooks';


jest.mock("./useSpotifyAuthContext", () => {
  return {
    __esModule: true,
    default: () => ({ token: 'token' }),
  };
});

interface MockResponse {
  id: string;
  name: string;
}

const mockResponse: MockResponse = {
  id: '1',
  name: "Lorem ipsum",
}

jest.mock('axios');

describe("useTextField", () => {

  const MOCK_URL = "/test/";

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should display initial state with before fetch call", () => {
    // Act 
    const { result } = renderHook(() => useFetch<MockResponse>());
    // Assert 
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loaded).toEqual(false);
    expect(result.current.fetch).toBeInstanceOf(Function);
  });


  it("should display loading state with no error or data", async () => {
    // Arrange
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    // Act 
    const { result, wait } = renderHook(() => useFetch<MockResponse>());
    act(() => {
      result.current.fetch(MOCK_URL);
    });
    await wait(() => result.current.loading === true);
    // Assert 
    expect(result.current.loading).toEqual(true);
  });

  it("should return data and state should update accordingly", async () => {
    // Arrange
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    // Act
    const { result, waitForNextUpdate } = renderHook(() => useFetch<MockResponse>());
    act(() => {
      result.current.fetch(MOCK_URL);
    });

    await waitForNextUpdate();
    // Assert 
    expect((axios.get as jest.Mock)).toBeCalledTimes(1);
    expect((axios.get as jest.Mock).mock.calls[0][0]).toEqual(MOCK_URL);
    expect((axios.get as jest.Mock).mock.calls[0][1]).toEqual({"headers": {"Authorization": "Bearer token"}});
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.loaded).toEqual(true);
  });


  it("should call multiple times when fetch is used with different urls", async () => {
    // Arrange
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    // Act
    const { result, waitForNextUpdate } = renderHook(() => useFetch<MockResponse>());
    act(() => {
      result.current.fetch(MOCK_URL);
    });

    await waitForNextUpdate();
    act(() => {
      result.current.fetch(MOCK_URL + 'route2');
    });

    await waitForNextUpdate();
    // Assert 
    expect((axios.get as jest.Mock)).toBeCalledTimes(2);
  });

  it("should set error message when axios throws", async () => {
    // Arrange
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Error occured"));
    // Act
    const { result, waitForNextUpdate } = renderHook(() => useFetch<MockResponse>());
    act(() => {
      result.current.fetch(MOCK_URL);
    });
    await waitForNextUpdate();
    // Assert 
    expect((axios.get as jest.Mock)).toBeCalledTimes(1);
    expect((axios.get as jest.Mock).mock.calls[0][0]).toEqual(MOCK_URL);
    expect((axios.get as jest.Mock).mock.calls[0][1]).toEqual({"headers": {"Authorization": "Bearer token"}});
    expect(result.current.error).toEqual("Error occured");
    expect(result.current.loading).toEqual(false);
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loaded).toEqual(true);
  });

});
