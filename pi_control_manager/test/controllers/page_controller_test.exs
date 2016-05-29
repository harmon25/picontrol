defmodule PiCntrlMngr.PageControllerTest do
  use PiCntrlMngr.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello PiCntrlMngr!"
  end
end
