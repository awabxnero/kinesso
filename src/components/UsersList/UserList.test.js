import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserList from "./UserList";
import { deleteUser } from "../../store/actions";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("UserList", () => {
  it("Check loading screen appearance", () => {
    const initialState = {
      users: [],
      loading: true,
      error: null,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders a list of users", () => {
    const initialState = {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "123456789",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "987654321",
        },
      ],
      loading: false,
      error: null,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const userCards = screen.getAllByTestId("user-card");
    expect(userCards).toHaveLength(2);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
  it("display error message", () => {
    const initialState = {
      users: [],
      loading: false,
      error: "Network error",
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.queryByTestId("user-card")).toBeNull();
  });

  it("delete user", () => {
    const initialState = {
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      loading: false,
      error: null,
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const deleteIcon = screen.getByTestId("delete-icon-1");
    fireEvent.click(deleteIcon);

    expect(store.dispatch).toHaveBeenCalledWith(deleteUser(1));
  });
});
